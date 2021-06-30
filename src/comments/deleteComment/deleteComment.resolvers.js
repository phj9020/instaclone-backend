import client from "../../client";
import { protectResolver } from "../../users/users.utils";


const resolverFn = async(_, {id}, {loggedInUser}) => {
    const comment = await client.comment.findUnique({
        where: {
            id:id
        },
        select: {
            userId: true
        }
    });
    if(!comment) {
        return {
            ok: false,
            error: "Comment not Found"
        }
    } else if(comment.userId !== loggedInUser.id) {
        return {
            ok: false,
            error: "You are not authorized"
        }
    } else {
        await client.comment.delete({
            where: {
                id: id
            }
        });
        return {
            ok: true
        }
    }
}

export default {
    Mutation: {
        deleteComment: protectResolver(resolverFn)
    }
}