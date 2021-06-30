import bcrypt from 'bcrypt';
import client from "../../client";

export default {
    Mutation: {
        createAccount: async(_, {firstName, lastName, username, email, password}) =>  {  
            try {
                // check @unique (uesrname, email) from prisma already exist 
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {
                                username: username
                            },
                            {
                                email: email
                            },
                        ],
                    },
                });
        
                if(existingUser) {
                    throw new Error("This uesrname/email is already in use.");
                }
                
                // hash password 
                const hashedPassword = await bcrypt.hash(password, 10);
                
                // save and return user
                await client.user.create({
                    data : {
                        username: username,
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        password: hashedPassword
                    }
                });
                return {
                    ok: true,
                };
            } catch(error) {
                return {
                    ok:false,
                    error: "Cannot Create Account"
                }
            }
            
        },
    }
}