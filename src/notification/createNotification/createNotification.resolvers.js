import client from "../../client";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async(_, {userId, payload}, {loggedInUser}) => {
    const ok = await client.user.findUnique({
        where: {
            id: loggedInUser.id
        },
    })
    if(!ok) {
        return {
            ok: false,
            error: "Logged In User Not Found"
        }
    }

    const newNotification = await client.notification.create({
        data: {
            payload: payload,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });

    return {
        ok: true,
        id: newNotification.id
    }
}

export default {
    Mutation: {
        createNotification: protectResolver(resolverFn)
    }
}