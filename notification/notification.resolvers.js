import client from "../client";


export default {
    Notification :{
        user: ({id})=> {
            return client.user.findUnique({
                where: {
                    id:id
                },
            });
        },
    }
}