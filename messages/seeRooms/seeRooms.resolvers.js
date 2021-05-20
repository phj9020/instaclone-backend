import client from "../../client";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async(_, __, {loggedInUser}) => {
    return await client.room.findMany({
        where: {
            users: {
                some: {
                    id: loggedInUser.id
                }
            },
        },
    });
};

export default {
    Query: {
        seeRooms: protectResolver(resolverFn)
    }
}