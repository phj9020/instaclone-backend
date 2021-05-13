import client from "../../client";
import {protectResolver} from '../users.utils';

const resolverFn =  async(_, {username}, {loggedInUser}) => {
    const findFollower = await client.user.findUnique({where: {username: username}});
    if(!findFollower) {
        return {
            ok: false,
            error: "Can't find username. Can't Follow"
        }
    };
    //update data using loggedInUser id 
    await client.user.update({
        where: {
            id: loggedInUser.id
        },
        data: {
            following: {
                connect: {
                    // 오직 특별한 field값으로 연결가능 
                    username: username,
                },
            },
        },
    });
    return {
        ok: true
    }
};

export default {
    Mutation: {
        followUser: protectResolver(resolverFn)
    },
}