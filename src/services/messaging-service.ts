import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createMessage = async (requestBody: any) => {
    
        let createdMessage: any;
    
        try {
            const messageToCreate = await prisma.conversationMessage.create({
                data: {
                    content: requestBody.content,
                    userId: requestBody.userId,
                    conversationId: requestBody.conversationId,
                },
            })
    
            createdMessage = messageToCreate
    
        } catch (error) {
            throw error
        }
            return createdMessage
        }
const getMessages = async () => {
        
            let foundMessages: any;
        
            try {
                const findMessagesRequest = await prisma.conversationMessage.findMany()
        
                foundMessages = findMessagesRequest
            } 
            catch (error) {
                throw error
            }
            return foundMessages
        }
const deleteMessage = async (receivedRequest: any) => {
            
                let deletedMessage: any;
            
                try {
                const idInParameters = parseInt(receivedRequest.params.id)
            
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
    getMessages,
    deleteMessage,
}