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
        },
        commentNumber: ({id}) => {
            return client.comment.count({
                where: {
                    photoId: id
                }
            })
        },
        comments: ({id}) => {
            return client.comment.findMany({
                where:{
                    photoId:id
                },
                include: {
                    user: true,
                }
            })
        },
        isMine: async({userId}, _, {loggedInUser}) => {
            if(!loggedInUser) {
                return false;
            }
            if(userId === loggedInUser.id) {
                return true
            } else {
                return false
            }
        },
        isLiked: async({id},_, {loggedInUser})=> {
            if(!loggedInUser) {
                return false; 
            }
            const ok = await client.like.findUnique({
                where:{
                    photoId_userId: {
                        photoId : id,
                        userId : loggedInUser.id
                    }
                },
                select: {
                    id: true,
                }
            });
            if(ok) {
                return true;
            }
            return false;
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