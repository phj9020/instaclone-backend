import client from "../../client";

export default {
    Query: {
        seePhotoComments: async(_, {id, offset}) => {
            return await client.comment.findMany({
                where: {
                    photoId: id
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 20,
                skip: offset,
            });

        }
    }
}