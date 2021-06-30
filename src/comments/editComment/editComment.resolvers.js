import client from "../../client";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async(_, {id, payload}, {loggedInUser}) => {
    const comment = await client.comment.findUnique({
        where: {id},
        select: {
            userId: true
        }
    });

    if(!comment) {
        return {
            ok: false,
            error: "Comment not Found"
        }
    } else if(comment.userId !== loggedInUser.id){
        return {
            ok: false,
            error: "You are not Authorized"
        }
    } else {
        // edit Comment 
        await client.comment.update({
            where: {
                id:id
            },
            data: {
                payload: payload
            }
        });
        return {
            ok: true
        }
    }
};

export default {
    Mutation: {
        editComment: protectResolver(resolverFn)
    }
};