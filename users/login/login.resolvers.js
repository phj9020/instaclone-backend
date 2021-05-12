import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
    Mutation: {
        login: async(_, {username, password}) => {
            // find user with args.username
            const user = await client.user.findFirst({where: {username: username}});

            // if user not found return loginResult
            if(!user) {
                return {
                    ok: false,
                    error: 'User not found'
                };
            }
            // check password with args.password
            const passwordOk = await bcrypt.compare(password, user.password);
            
            // if not match throw below object
            if(!passwordOk) {
                return {
                    ok: false,
                    error: "Incorrect Password"
                }
            }
            // issue a json web token and send it to the user 
            const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY);
            return {
                ok: true,
                token: token,
            }
        }
    }
}