import client from "../../client";

export default {
    Query: {
        seePhoto: async(_, {id}) => client.photo.findUnique({
            where: {
                id: id
            }
        })
    }
}