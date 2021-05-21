import client from "../client";

export default {
    Message : {
        user: ({id})=> {
            return client.message.findUnique({
                where: {
                    id:id
                },
            }).user();
        },
        room: ({id})=> {
            return client.message.findUnique({
                where: {
                    id:id
                },
            }).room();
        }
    },
    Room:{
        users:({id})=> {
            // return client.room.findUnique({where: {id}}).users(); 
            return client.user.findMany({
                    where: {
                        rooms: {
                            some: {
                                id: id
                            }
                        },
                    }
            });
        }, 
        messages: ({id}, {page})=> {
            return client.message.findMany({
                where: {
                    roomId: id,
                },
                take: 10,
                skip: (page - 1) * 10
            });
        },
        unreadTotal: ({id}, _, {loggedInUser}) => {
            if(!loggedInUser) {
                return 0;
            }
            return client.message.count({
                where: {
                    read: false,
                    roomId: id,
                    user: {
                        id: {
                            not: loggedInUser.id
                        },
                    },
                },
            });
        },
    }
}