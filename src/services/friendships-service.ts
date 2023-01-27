import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createFriendship = async (requestBody: any, userIdFromLocal: any) => {

    let createdFriendship: any;

    try {
        const friendshipToCreate = await prisma.friendship.create({
            data: {
                fromId: userIdFromLocal,
                toId: parseInt(requestBody.toId, 10),
            },
        })

        createdFriendship = friendshipToCreate

    } catch (error) {
        throw error
    }
    return createdFriendship
}

/********************************************************************************/

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

/********************************************************************************/

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

/********************************************************************************/

const deleteFriendship = async (receivedRequest: any) => {
    let deletedFriendship: any;

    try {
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

/********************************************************************************/

const updateFriendship = async (receivedRequest: any, userIdFromLocal: number) => {
    let updatedFriendship: any;

    try {
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


        const findModifiedFriendship = await prisma.friendship.findMany({
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
        })

        const findExistingConversation = await prisma.conversation.findMany({
            where: {
                OR: [{
                    AND: [
                        {
                            fromId: userIdFromLocal
                        },
                        {
                            toId: receivedRequest.body.fromId
                        }
                    ]
                },
                {
                    AND: [
                        {
                            fromId: receivedRequest.body.fromId
                        },
                        {
                            toId: userIdFromLocal
                        }
                    ]
                }]
            }
        })

        //prisma findMany returns an array
        if (findExistingConversation.length > 0) {
            throw new Error("Conversation already exists");
        }

        //Check if the status is ACCEPTED, if so, create a conversation
        if (findModifiedFriendship[0].status === "ACCEPTED") {
            await prisma.conversation.create({
                data: {
                    fromId: userIdFromLocal,
                    toId: findModifiedFriendship[0].fromId,
                }
            })
        }


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