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
        // 유저가 query 하는지 mutation하는지 체크
        // console.log(info)
        const query = info.operation.operation === "query";
        if(query) {
            return null;
        } else {
            return {
                ok: false,
                error: "You must be logged in"
            }

        }
    }
    // if logged in return resolver
    return ourResolver(root, args, context, info);
};



