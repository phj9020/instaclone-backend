import client from "../../client";
import { protectResolver } from "../../users/users.utils";


const resolverFn = async(_, {payload, roomId, userId}, {loggedInUser}) => {
    let room; 

    // 유저에 바로 채팅을 했을 경우
    if(userId){
        // 먼저 대화 상대를 찾는다 
        const user = await client.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
            },
        });
        // 대화 상대가 존재하지 않는다면 
        if(!user) {
            return {
                ok: false,
                error: "This User does not Exist"
            }
        };
        // 존재한다면 찾은 상대와 로그인한 유저를 같이 대화방에 넣는다  
        room = await client.room.create({
            data: {
                users: {
                    connect: [
                        {
                            id: userId
                        },
                        {
                            id: loggedInUser.id
                        },
                    ],
                },
            },
        });
        
    } else if(roomId) {
        // 먼저 room 을 찾자
        room = await client.room.findUnique({
            where: {
                id: roomId
            },
            select: {
                id: true,
            }
        });
        // room 이 존재하지 않는다면 error 리턴 
        if(!room) {
            return {
                ok: false,
                error: "Room not Found"
            }
        };
    }

    // create Message & connect room with newRoom.id & connect user with loggedInUser.id
    await client.message.create({
        data: {
            payload: payload,
            room: {
                connect: {
                    id: room.id
                }
            },
            user: {
                connect: {
                    id: loggedInUser.id
                }
            },
        },
    });

    return {
        ok: true
    }

};

export default {
    Mutation: {
        sendMessage: protectResolver(resolverFn)
    }
}