import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createFriendshipNotification = async (requestBody: any) => {
    
        let createdNotification: any;
    
        try {
            const notificationToCreate = await prisma.notification.create({
                data: {


                },
            })
    
            createdNotification = notificationToCreate
    
        } catch (error) {
            throw error
        }
            return createdNotification
        };

export {
    createFriendshipNotification
}