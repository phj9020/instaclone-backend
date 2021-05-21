import pubsub from "../../pubsub";
import {NEW_MESSAGE} from "../../constants";

export default {
    Subscription: {
        roomUpdates: {
            // asyncIterator 기 trigger들을 listen한다 
            subscribe: () => pubsub.asyncIterator(NEW_MESSAGE),
        },
    }
}