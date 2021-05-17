import client from "../../client";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async(_,{file, caption}, {loggedInUser}) => {
    // parse hashtaged word from caption
    let hashtagObjs = [];

    if(caption) {
        const extractedHashtagsArray = caption.match(/#[\w]+/g);
        // get or create Hashtags 
        hashtagObjs = extractedHashtagsArray.map(item => ({where: {hashtag: item}, create: {hashtag: item}}));
        console.log(hashtagObjs)
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