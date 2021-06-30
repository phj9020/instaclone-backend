import client from "../../client";
import { protectResolver } from "../users.utils";

const resolverFn = async(_, __, {loggedInUser}) => {
    return client.user.findUnique({
        where: {
            id: loggedInUser.id
        },
    })
};

export default {
    Query :{
        me: protectResolver(resolverFn)
    }
}