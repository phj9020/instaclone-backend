import client from "../../client";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async(_, {id}, {loggedInUser}) => {
    const message = await client.message.findFirst({
        where: {
            // 매세지 찾고 
            id: id,
            // 메세지가 내가 보낸게 아니라는 것을 확인
            userId: {
                not: loggedInUser.id
            },
            // 내가 들어가 있는 대화방에서 메세지가 보내진 건지 확인 
            room: {
                users: {
                    some: {
                        id: loggedInUser.id
                    }
                }
            },
        },
        select: {
            id: true
        }
    });

    if(!message) {
        return {
            ok: false,
            error: "Message Not Found"
        }
    };

    // 메세지 내용 업데이트 => 읽음 true
    await client.message.update({
        where: {
            id:id
        },
        data: {
            read: true
        }
    });
    
    return {
        ok: true
    }
};

export default {
    Mutation: {
        readMessage: protectResolver(resolverFn)
    }
}