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
        likes: ({id}) => {
            return client.like.count({
                where: {
                    photoId: id
                },
            })
        }
    },
    Hashtag: {
        photos: ({id}, {page}) => {
            return client.photo.findMany({
                where: {
                    hashtags: {
                        some: {
                            id: id
                        }
                    }
                },
                take: 5,
                skip: (page - 1) * 5
            });
        },
        totalPhotos: async({id}) => {
            return await client.photo.count({
                where: {
                    hashtags: {
                        some : {
                            id: id
                        }
                    }
                }
            })
        },
    }
};