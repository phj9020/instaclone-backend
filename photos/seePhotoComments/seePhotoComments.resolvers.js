import client from "../../client";

export default {
    Query: {
        seePhotoComments: async(_, {id, page}) => {
            return await client.comment.findMany({
                where: {
                    photoId: id
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 5,
                skip: (page - 1) * 5
            });

        }
    }
}