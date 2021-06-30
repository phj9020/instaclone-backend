import client from "../../client";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async(_, {id}, {loggedInUser}) => {
    // find photo
    const photo = await client.photo.findUnique({where: {id}});
    // if photo not exist return error
    if(!photo) {
        return {
            ok: false,
            error: "Photo Not Found"
        }
    };
    const likeWhere = {
        // @@unique([photoId, userId])
        photoId_userId: {
            userId: loggedInUser.id,
            photoId: id
        }
    }
    // find like
    const like = await client.like.findUnique({
        where: likeWhere
    });

    // if already liked, delete it, else create like 
    if(like) {
        await client.like.delete({
            where: likeWhere
        });
    } else {
        await client.like.create({
            data: {
                user: {
                    connect: {
                        id: loggedInUser.id
                    }
                },
                photo: {
                    connect: {
                        id: photo.id
                    }
                }
            }
        })
    };

    return {
        ok: true,
    }
}

export default {
    Mutation: {
        toggleLike: protectResolver(resolverFn)
    }
}