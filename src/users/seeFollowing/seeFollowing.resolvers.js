import client from "../../client";

export default {
    Query: {
        seeFollowing: async(_, {username, lastId}) => {
            // check if user Exist 
            const userExist = await client.user.findUnique({
                where: {
                    username: username
                },
                select: {
                    id: true
                }
            });
            if(!userExist) {
                return {
                    ok: false,
                    error: "User not Found"
                }
            };

            const following = await client.user.findUnique({
                where: {
                    username: username
                }
            }).following({
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && {cursor: { id : lastId }})
            });
            return {
                ok: true,
                following: following
            }

        }
    }
}