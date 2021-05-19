import client from "../client";

export default {
    Comment: {
        isMine: async({userId}, _, {loggedInUser}) => {
            if(!loggedInUser) {
                return false;
            }
            if(userId === loggedInUser.id) {
                return true
            } else {
                return false
            }
        },
    }
}