import client from "../../client";

export default {
    Query: {
        seeProfile: (_, {username}) =>  client.user.findUnique({
            where: {
                username: username
            },
            include: {
                // include 원하는 사용자 관계를 갖고 올수 있게 해줌
                following: true,
                followers: true,
            }
        })
    }
}