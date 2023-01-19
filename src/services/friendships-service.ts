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

const getFriendshipsById = async (receivedRequest: any) => {
    let foundFriendshipsById: any;

    try {
        const idInParameters = parseInt(receivedRequest.params.id)

        const findFriendshipsByIdRequest = await prisma.friendship.findUnique({
            where: {
                id: idInParameters
            },
        })

        foundFriendshipsById = findFriendshipsByIdRequest
    }
    catch (error) {
        throw error
    }
    return foundFriendshipsById
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

export {
    createFriendship,
    getFriendships,
    deleteFriendship,
    getFriendshipsById
}