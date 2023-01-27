import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createMessage = async (userIdFromLocal: number, requestBody: {conversationId: string, content: string}) => {

    let createdMessage;

    try {
        const messageToCreate = await prisma.conversationMessage.create({
            data: {
                conversationId: parseInt(requestBody.conversationId, 10),
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

const getMessagesPerConversation = async (receivedIdFromParams: number) => {

    let foundMessages;

    try {
        const findMessagesRequest = await prisma.conversationMessage.findMany({
            where: { conversationId: receivedIdFromParams }
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

    let deletedMessage;

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