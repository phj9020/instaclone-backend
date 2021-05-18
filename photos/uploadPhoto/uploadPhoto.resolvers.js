import client from "../../client";
import { protectResolver } from "../../users/users.utils";
import {processHash} from "../photos.utils";

const resolverFn = async(_,{file, caption}, {loggedInUser}) => {
    // parse hashtaged word from caption
    let hashtagObjs = [];

    if(caption) {
        // get or create Hashtags 
        hashtagObjs = processHash(caption);
    }
    
    // save the Photo Model with the parsed hashtags
    return await client.photo.create({data: {
        file: file,
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