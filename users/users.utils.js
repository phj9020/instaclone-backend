import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async(token)=> {
    try {
        if(!token) {
            return null;
        }
        // verify if token is created from us 
        const {id} = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.user.findUnique({where : {id}});
        
        if(user) {
            return user;
        } else {
            return null;
        }
    } catch {
        return null;
    }
};

// resolver returns graphql resover
export const protectResolver = (ourResolver) => (root, args, context, info) => {
    // if not logged in return below object
    if(!context.loggedInUser) {
        return {
            ok: false,
            error: "You must be logged in"
        }
    }
    // if logged in return resolver
    return ourResolver(root, args, context, info);
};



