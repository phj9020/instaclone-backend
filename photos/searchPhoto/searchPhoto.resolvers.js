import client from "../../client";

export default {
    Query: {
        searchPhoto: (_, {keyword, page}) => {
            return client.photo.findMany({
                where : {
                    caption: {
                        startsWith : keyword
                    }
                },
                take: 5, 
                skip: (page - 1) * 5,
            })
        }
    }
}