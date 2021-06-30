import client from "../../client";
import { protectResolver } from "../../users/users.utils";


const resolverFn = async(_, {offset}, {loggedInUser}) => {
    return await client.photo.findMany({
        where: {
            OR: [
                {
                    // 팔로워 목록에 내 아이디를 가진 유저의 Photo Feed 보거나 
                    user: {
                        followers: {
                            some: {
                                id: loggedInUser.id
                            }
                        }
                    }
                },
                {
                    // 자기 자신의 Photo Feed 보기 
                    user: {
                        id: loggedInUser.id
                    }
                }
            ]
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 2,
        skip: offset,
    })
};

export default {
    Query : {
        seeFeed: protectResolver(resolverFn)
    }
}