import client from "../../client";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async(_, {id}, {loggedInUser}) => {
    return await client.room.findFirst({
        where: {
            id: id,
            users: {
                some: {
                    id: loggedInUser.id
                },
            },
        },
    });
};

export default {
    Query: {
        seeRoom: protectResolver(resolverFn)
    }
}