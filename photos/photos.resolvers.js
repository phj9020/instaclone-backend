import client from "../client";

export default {
    Photo:{
        user: ({userId}) => {
            return client.user.findUnique({where: {id: userId}});
        },
        hashtags: ({id})=> {
            return client.hashtag.findMany({
                where: {
                    photos: {
                        some: {
                            id: id
                        }
                    }
                },
            })
        },
    },
};