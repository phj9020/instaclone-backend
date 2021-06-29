import client from "../../client";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async(_, {id}, {loggedInUser}) => {
    const notification = await client.notification.findUnique({
        where: {
            id: id
        },
        select: {
            userId: true
        }
    });
    console.log(notification);

    if(!notification) {
        return {
            ok: false,
            error: "Notification not found"
        }
    } 
    await client.notification.delete({
        where: {
            id:id
        }
    });
    return {
        ok: true,
    }
}

export default {
    Mutation: {
        deleteNotification: protectResolver(resolverFn)
    }
}