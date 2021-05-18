import { loadFiles } from "@graphql-tools/load-files";
import client from "../../client";

export default {
    Query : {
        seePhotoLikes: async(_, {id}) => {
            const likes = await client.like.findMany({
                where: {photoId: id},
                select: {
                    user: true
                }
            })
            return likes.map(item => item.user)
        }
    }
}