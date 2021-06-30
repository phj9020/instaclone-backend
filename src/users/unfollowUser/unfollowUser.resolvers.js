import client from "../../client";
import {protectResolver} from '../users.utils';

const resolverFn = async(_, {username}, {loggedInUser})=> {
    const findUser = await client.user.findUnique({where: {username: username}});
    if(!findUser){
        return {
            ok: false,
            error: "Can't unfollow User"
        }
    };
    //update data using loggedInUser id 
    await client.user.update({
        where: {
            id: loggedInUser.id
        },
        data: {
            following: {
                disconnect: {
                    username: username,
                }
            }
        },
    });
    return {
        ok: true
    }
}

export default {
    Mutation: {
        unfollowUser: protectResolver(resolverFn)
    }
};