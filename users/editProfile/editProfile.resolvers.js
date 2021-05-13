import client from "../../client";
import bcrypt from 'bcrypt';
import {protectResolver} from "../users.utils";
import fs from "fs";



const resolverFn = async(_, {firstName, lastName, username, email, password:newPassword, bio, avatar}, {loggedInUser}) => {
    
    // get filename and createReadStream function from avatar
    const {filename, createReadStream} = await avatar;
    
    // read Stream
    const readStream = createReadStream();
    // Write Stream with directory + filename 
    const writeStream = fs.createWriteStream(process.cwd() + "/uploads/" + filename);

    // pipe stream
    readStream.pipe(writeStream);

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
            bio,
            avatar: "",
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