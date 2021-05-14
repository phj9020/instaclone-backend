import client from "../../client";


export default {
    Query: {
        seeFollowers: async(_, {username, page}) => {
            // 유저가 있는지 확인만 하고 싶은데 모든 정보를 다 가져온다 따라서 select을 이용해 Id 가 true인지 체크
            const userExist = await client.user.findUnique({
                where: {
                    username: username
                },
                select: {
                    id: true,
                }
            });
            if(!userExist) {
                return {
                    ok: false,
                    error: "User not Found"
                }
            }

            // 특정 유저를 먼저 찾고 그 팔로워들을 찾는다 get followers of user (**별로 좋지 않은 방법이지만 이렇게 가져올 수 있다)
            const followers = await client.user.findUnique({where: {username: username}}).followers({
                take: 5,
                skip: (page - 1) * 5,
            });
            // 각 팔로잉 어레이에서 해당 유저를 가지고 있는 수를 센다 
            const pages = await client.user.count({
                where: { 
                    following : { some : { username}}
                }
            });
            return {
                ok: true,
                followers: followers,
                totalPages: Math.ceil(pages / 5)
            }

        }
    }
}