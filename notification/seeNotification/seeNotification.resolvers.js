import client from "../../client";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async(_, __, {loggedInUser}) => {
    return await client.notification.findMany({
        where: {
            userId: loggedInUser.id
        },
    });
};

export default {
    Query: {
        seeNotification: protectResolver(resolverFn)
    }
}