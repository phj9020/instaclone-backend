import client from "../../client";
import bcrypt from 'bcrypt';
import {protectResolver} from "../users.utils";

const resolverFn = async(_, {firstName, lastName, username, email, password:newPassword}, {loggedInUser}) => {
                
    let hashedPassword=null;
    
    // if new password exist hash paswword
    if(newPassword) {
        hashedPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
        where: {
            id: loggedInUser.id
        }, 
        data: {
            firstName, 
            lastName, 
            username, 
            email, 
            ...(hashedPassword && { password: hashedPassword })
        },
    });
    // if user id found return EditProfileResult
    if(updatedUser.id) {
        return {
            ok: true,
        } 
    } else {
        return {
            ok: false,
            error: "Could not Update Profile"
        }
    }
};

export default {
    Mutation: {
        editProfile: protectResolver(resolverFn)
    },
};