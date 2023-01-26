import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createMessage = async (userIdFromLocal: number, requestBody: any) => {

    let createdMessage: any;

    try {
        const messageToCreate = await prisma.conversationMessage.create({
            data: {
                conversationId: requestBody.conversationId,
                userId: userIdFromLocal,
                content: requestBody.content,
            }
        })

        createdMessage = messageToCreate

    } catch (error) {
        throw error
    }
    return createdMessage
}

/********************************************************************************/

const getMessagesPerConversation = async (receivedRequestParams: number) => {

    let foundMessages: any;

    try {
        const findMessagesRequest = await prisma.conversationMessage.findMany({
            where: { conversationId: receivedRequestParams }
        })

        foundMessages = findMessagesRequest
    }
    catch (error) {
        throw error
    }
    return foundMessages
}

/********************************************************************************/

const deleteMessage = async (idInParameters: number) => {

    let deletedMessage: any;

    try {

        const deletedMessageRequest = await prisma.conversationMessage.delete({
            where: { 
                id: idInParameters 
            }, 
        })

        deletedMessage = deletedMessageRequest
    }
    catch (error) {
        throw error
    }
    return deletedMessage
}

export {
    createMessage,
    getMessagesPerConversation,
    deleteMessage,
}