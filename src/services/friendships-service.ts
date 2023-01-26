import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createFriendship = async (requestBody: any) => {
        
            let createdFriendship: any;
        
            try {
                const friendshipToCreate = await prisma.friendship.create({
                    data: {
                        fromId: requestBody.fromId,
                        toId: requestBody.toId,
                    },
                })
        
                createdFriendship = friendshipToCreate
        
            } catch (error) {
                throw error
            }
                return createdFriendship
            }

const getFriendshipsByUserId = async (receivedRequest: any, userIdFromLocal: any) => {
                    
                        try {
                            const findFriendshipsRequest = await prisma.friendship.findMany(
                                {
                                    where: {
                                        OR: [
                                            {
                                                fromId: userIdFromLocal,
                                            }, 
                                            {
                                                toId: userIdFromLocal,
                                            }
                                        ]                                        
                                    },
                                    include: 
                                    {
                                        from: {
                                            select: {
                                                id: true,
                                                email: true,
                                                firstname: true,
                                                lastname: true,
                                            }
                                        },
                                        to: {
                                            select: {
                                                id: true,
                                                email: true,
                                                firstname: true,
                                                lastname: true,
                                            }
                                        },
                                    }
                                }
                            )
                            return findFriendshipsRequest;                    
        
                        } 
                        catch (error) {
                            throw error
                        }
                    } 

const getFriendships = async () => {

    let foundFriendships: any;

    try {
        const findFriendshipsRequest = await prisma.friendship.findMany()
        
        foundFriendships = findFriendshipsRequest
    }
    catch (error) {
        throw error
    }
    return foundFriendships
}

const deleteFriendship = async (receivedRequest: any) => {
        let deletedFriendship: any;

        try{
            const idInParameters = parseInt(receivedRequest.params.id)

            const deletedFriendshipRequest = await prisma.friendship.delete({
                where: {
                    id: idInParameters
                },
            })

            deletedFriendship = deletedFriendshipRequest
        } catch (error) {
            throw error
        }
        return deletedFriendship
    }

const updateFriendship = async (receivedRequest: any, userIdFromLocal: number) => {
        let updatedFriendship: any;
        
        try{
            const updatedFriendshipRequest = await prisma.friendship.updateMany({
                where: {
                    AND: [
                        {
                            toId: userIdFromLocal
                        },
                        {
                            fromId: receivedRequest.body.fromId
                        }
                    ] 
                },
                data: {
                    status: receivedRequest.body.status
                },
            })

            updatedFriendship = updatedFriendshipRequest
        } catch (error) {
            throw error
        }
        return updatedFriendship
    }
    
export {
    createFriendship,
    getFriendshipsByUserId,
    deleteFriendship,
    getFriendships,
    updateFriendship
}