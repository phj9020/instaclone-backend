import {withFilter} from "apollo-server-express";
import pubsub from "../../pubsub";
import {NEW_MESSAGE} from "../../constants";
import client from "../../client";

export default {
    Subscription: {
        roomUpdates: {
            subscribe: async(root, args, context, info) => {
                // console.log(context);
                // 방이 존재하지 않으면 유저가 방을 리스닝 하지 못하게 처리 
                const room = await client.room.findFirst({
                    where: {
                        id: args.id,
                        users: {
                            some: {
                                id: context.loggedInUser.id
                            }
                        },
                    },
                    select: {
                        id: true,
                    },
                });
                
                if(!room) {
                    throw new Error("You shall not see this");
                };
                
                // withFilter takes 2 arguments  1. asyncIterator 2. filter function which returns true, if true, user will get update
                return withFilter(
                    // asyncIterator 기 trigger들을 listen한다 
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    async(payload, variables, context) => {
                        if(payload.roomUpdates.roomId === variables.id){
                            const room = await client.room.findFirst({
                                where: {
                                    id: variables.id,
                                    users: {
                                        some: {
                                            id: context.loggedInUser.id
                                        }
                                    },
                                },
                                select: {
                                    id: true,
                                },
                            });
                            if(!room) {
                                return false;
                            } 
                            return true;
                        }
                        // console.log(context.loggedInUser)
                        // console.log(payload)
                        // console.log("RoomId", variables)
                        // return payload.roomUpdates.roomId === variables.id
                    }
                )(root, args, context, info);   // call withFilter /  withFilter function returns a function

            }
        },
    }
}