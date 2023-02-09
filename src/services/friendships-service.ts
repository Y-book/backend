import { PrismaClient } from "@prisma/client";
import * as conversationService from "./conversation-service";

const prisma = new PrismaClient();

const createFriendship = async (requestBody: { toId: string }, userIdFromLocal: number) => {

    let createdFriendship;

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

const getFriendshipsByUserId = async (userIdFromLocal: number) => {

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

    let foundFriendships;

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

const deleteFriendship = async (receivedRequest: { params: { id: string } }) => {
    let deletedFriendship;

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

const updateFriendship = async (receivedRequest: { body: { fromId: number, status: string | any } }, userIdFromLocal: number) => {
    let updatedFriendship;

    try {
        const updatedFriendshipRequest = await prisma.friendship.updateMany({
            where: {
                AND: [
                    { toId: userIdFromLocal },
                    { fromId: receivedRequest.body.fromId }
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
                    { toId: userIdFromLocal },
                    { fromId: receivedRequest.body.fromId }
                ]
            },
        })

        const findExistingConversation = await conversationService.findExistingConversationBetweenUsers(userIdFromLocal, receivedRequest.body.fromId);

        //prisma findMany returns an array
        if (findExistingConversation.length > 0) {
            throw new Error("Conversation already exists");
        }

        //Check if the status is ACCEPTED, if so, create a conversation
        if (findModifiedFriendship[0].status === "ACCEPTED") {
            await conversationService.createConversation(userIdFromLocal, receivedRequest.body.fromId);
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