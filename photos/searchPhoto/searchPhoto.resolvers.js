import client from "../../client";

export default {
    Query: {
        searchPhoto: (_, {keyword, offset}) => {
            return client.photo.findMany({
                where : {
                    caption: {
                        contains : keyword
                    }
                },
                take: 18, 
                skip: offset,
            })
        }
    }
}