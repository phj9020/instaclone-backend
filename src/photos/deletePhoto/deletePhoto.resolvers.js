import client from "../../client";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async(_, {id}, {loggedInUser}) => {
    const photo = await client.photo.findUnique({
        where: {id},
        select: {
            userId: true
        }
    });
    // if photo not found else if you not the owner of photo 
    if(!photo) {
        return {
            ok: false,
            error: "Photo Not Found"
        }
    } else if(photo.userId !== loggedInUser.id) {
        return {
            ok: false,
            error: "You are not authorized"
        }
    } else {
        await client.photo.delete({
            where: {
                id: id
            }
        });
        return {
            ok: true
        }
    }
}


export default {
    Mutation: {
        deletePhoto: protectResolver(resolverFn)
    }
}