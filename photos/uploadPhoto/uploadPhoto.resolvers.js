import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectResolver } from "../../users/users.utils";
import {processHash} from "../photos.utils";

const resolverFn = async(_,{file, caption}, {loggedInUser}) => {
    // parse hashtaged word from caption
    let hashtagObjs = [];

    if(caption) {
        // get or create Hashtags 
        hashtagObjs = processHash(caption);
    }
    
    // get file url
    const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads")

    // save the Photo Model with the parsed hashtags
    return await client.photo.create({data: {
        file: fileUrl,
        caption: caption,
        user: {
            connect: {
                id: loggedInUser.id
            }
        },
        ...(hashtagObjs.length > 0 && {
            hashtags: {
                connectOrCreate : hashtagObjs
            }
        })
    }});
};

export default {
    Mutation: {
        uploadPhoto: protectResolver(resolverFn)
    },
};