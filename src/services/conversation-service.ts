import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createConversation = async (userIdFromLocal: number, requestBody: any ) => {
    let createdConversation: any;

    try {

        const conversationToCreate = await prisma.conversation.create({
            data: {
                fromId: userIdFromLocal,
                toId: requestBody.toId,
            },
        })
        createdConversation = conversationToCreate
    } catch (error) {
        throw error
    }
    return createdConversation
}

/********************************************************************************/

const getConversations = async (userIdFromLocal: number) => {
    let foundConversations: any;

    try {
        const findConversationsRequest = await prisma.conversation.findMany({
            where: {
                fromId: userIdFromLocal
            }
        })

        foundConversations = findConversationsRequest
    } catch (error) {
        throw error
    }
    return foundConversations
}

/********************************************************************************/

const deleteConversation = async (receivedRequest: any) => {
    let deletedConversation: any;

    try {
        const idInParameters = parseInt(receivedRequest.params.id)

        const deletedConversationRequest = await prisma.conversation.delete({
            where: {
                id: idInParameters
            },
        })

        deletedConversation = deletedConversationRequest
    } catch (error) {
        throw error
    }
    return deletedConversation
}

export {
    createConversation,
    getConversations,
    deleteConversation,
}