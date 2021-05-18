import client from "../client";


// computed Fields (*Not in DB)
export default {
    User: {
        // 사람들의 follower 리스트에서 내 아이디 가진 사람이 몇명인지 세자
        totalFollowings: ({id}) => 
            client.user.count({
                where :{
                    followers: {
                        some: {
                            id
                        }
                    }
                }
            }),
        // 사람들의 following 리스트에서 내 아이디 가진 사람이 몇명인지 세자
        totalFollowers: ({id}) => 
            client.user.count({
                where :{
                    following: {
                        some: {
                            id
                        }
                    }
                }
            }),
        isMe: ({id}, _, {loggedInUser}) => {
            // 로그인된 상태가 아니라면 본인 확인이 안되므로 false 리턴
            if(!loggedInUser) {
                return false;
            }
            // 현재 찾는 사람의 root 의 Id 와 로그인 한사람의 ID 를 비교해서 리턴 
            if(id === loggedInUser.id) {
                return true;
            } else {
                return false;
            }
        },
        isFollowing: async({id}, _, {loggedInUser}) => {
            
            if(id === loggedInUser.id) {
                return false; 
            }
            if(!loggedInUser) {
                return false;
            }

            const exists = await client.user.count({
                where: {
                    username: loggedInUser.username,
                    following: { 
                        some: {
                            id: id,
                        }
                    }
                },
                
            });
            return Boolean(exists);
        },
        photos:({id},{page}) => {
            // return client.photo.findMany({
            //     where: {
            //         userId: id
            //     },
            //     take:5,
            //     skip: (page - 1) * 5,
            // })

            return client.user.findUnique({where: {id}}).photos(
                {
                    take:5,
                    skip: (page - 1) * 5,
                }
            )
        },
    }
};