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
        user: ({userId})=>{
            return client.user.findUnique({where: {id : userId}})
        },
    }
}