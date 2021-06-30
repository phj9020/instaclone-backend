import client from "../../client";
import {protectResolver} from "../../users/users.utils";
import {processHash} from "../photos.utils";

const resolverFn = async(_, {id,caption}, {loggedInUser}) => {
    // find the photo we want to edit and check if loggedInUser own this photo
    const oldPhoto = await client.photo.findFirst({
        where: {
            id:id,
            userId: loggedInUser.id
        },
        include: {
            hashtags: {
                select: {
                    hashtag: true,
                }
            }
        }
    });

    // not match return error 
    if(!oldPhoto) {
        return {
            ok: false,
            error: "Photo Not Found"
        }
    }

    // upadate photo and disconnect hastag from oldPhoto
    await client.photo.update({
        where: {
            id: id
        },
        data: {
            caption: caption,
            hashtags: {
                disconnect: oldPhoto.hashtags,
                connectOrCreate: processHash(caption),
            },
        }
    });
    return {
        ok: true
    }
};

export default {
    Mutation: {
        editPhoto: protectResolver(resolverFn)
    }
}