import client from "../../client";
import bcrypt from 'bcrypt';
import {protectResolver} from "../users.utils";
import { uploadToS3 } from "../../shared/shared.utils";



const resolverFn = async(_, {firstName, lastName, username, email, password:newPassword, bio, avatar}, {loggedInUser}) => {
    
    let avatarUrl = null;
    // avatar가 존재할 때 실행 
    if(avatar) {
        avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");


        /*
        === file save in local server ===
        // get filename and createReadStream function from avatar
        const {filename, createReadStream} = await avatar;
        //create random filename in order to prevent same filename crash
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
        //read Stream 
        const readStream = createReadStream();
        //Write Stream with directory + filename (경로설정) 
        const writeStream = fs.createWriteStream(process.cwd() + "/uploads/" + newFilename);
        //pipe stream (저장) 
        readStream.pipe(writeStream);
        avatarUrl = `http://localhost:4000/static/${newFilename}`;
        */

    }

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
            email, 
            ...(avatarUrl && { avatar: avatarUrl }),
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