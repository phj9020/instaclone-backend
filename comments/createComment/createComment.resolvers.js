import client from "../../client";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async(_, {photoId, payload}, {loggedInUser}) => {
    // get only photo id and check photoId exist 
    const ok = await client.photo.findUnique({
        where: {
            id: photoId
        },
        select: {
            id: true
        }
    });

    // if photo not exist return error
    if(!ok) {
        return {
            ok: false,
            error: "Photo Not Found"
        }
    }

    // create comment 
    const newComment = await client.comment.create({
        data : {
            payload: payload,
            photo: {
                connect: {
                    id: photoId
                }
            },
            user: {
                connect: {
                    id: loggedInUser.id
                }
            },
        }
    });

    return {
        ok: true,
        id: newComment.id,
    };

};

export default {
    Mutation: {
        createComment: protectResolver(resolverFn)
    }
}