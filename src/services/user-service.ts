import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (requestBody: any) => {

let createdUser: any;

try {
    const userToCreate = await prisma.user.create({
        data: {
            firstname: requestBody.firstname,
            lastname: requestBody.lastname,
            email: requestBody.email,
        },
    })

    createdUser = userToCreate

} catch (error) {
    throw error
}
    return createdUser
}

/********************************************************************************/

const getUsers = async () => {

    let foundUsers: any;

    try {
        const findUsersRequest = await prisma.user.findMany()

        foundUsers = findUsersRequest
    } 
    catch (error) {
        throw error
    }
    return foundUsers
}

/********************************************************************************/

const getUserById = async (receivedRequest: any) => {

    let foundUser: any;    

    try {

        const idInParameters = parseInt(receivedRequest.params.id)        

        const findUserRequest = await prisma.user.findUnique({
            where: {
                id: idInParameters
            }
        })

        foundUser = findUserRequest
    }
    catch (error) {
        throw error
    }

    return foundUser
}


const getConnectedUserById = async (receivedRequest: any, userIdFromLocal: any) => {

    let foundUser: any;    

    try {

        const findUserRequest = await prisma.user.findUnique({
            where: {
                id: userIdFromLocal
            }
        })

        foundUser = findUserRequest
    }
    catch (error) {
        throw error
    }

    return foundUser
}

const getUserByMail = async (mail: string) => {

    let foundUser: any;

    try {

        const findUserRequest = await prisma.user.findUnique({
            where: {
                email: mail
            }
        })

        foundUser = findUserRequest
    }
    catch (error) {
        throw error
    }

    return foundUser
}

/********************************************************************************/

const getUsersWithResearch = async (receivedRequest: any) => {
    
        let foundUsers: any;
    
        try {
    
            const researchedTerm = receivedRequest.body.research
    
            const findUsersRequest = await prisma.user.findMany({
                where: {
                    OR: [
                        {
                            firstname: {
                                contains: researchedTerm
                            }
                        },
                        {
                            lastname: {
                                contains: researchedTerm
                            }
                        }
                    ]
                },
                select: {
                    firstname: true,
                    lastname: true,
                }
            })
    
            foundUsers = findUsersRequest
        }
        catch (error) {
            throw error
        }
    
        return foundUsers
}

/********************************************************************************/

const updateUser = async (receivedRequest: any) => {

    let modifiedUser: any;

    try {
    const idInParameters = parseInt(receivedRequest.params.id)

    const requestBody = receivedRequest.body

    const modifiedUserRequest = await prisma.user.update({
        where: {
            id: idInParameters
        },
        data: {
            firstname: requestBody.firstname,
            lastname: requestBody.lastname,
            email: requestBody.email,
        }
    })

    modifiedUser = modifiedUserRequest
    }
    catch (error) {
        throw error
    }

    return modifiedUser
}

/********************************************************************************/

const deleteUser = async (receivedRequest: any) => {

    let deletedUser: any;

    try {
        const idInParameters = parseInt(receivedRequest.params.id)

        const deleteUserRequest = await prisma.user.delete({
            where: {
                id: idInParameters
            }
        })

        deletedUser = deleteUserRequest
    }
    catch (error) {
        throw error
    }

    return deletedUser
}

export {
    createUser,
    getUsers,
    getUserById,
    getConnectedUserById,
    getUserByMail,
    updateUser,
    deleteUser,
    getUsersWithResearch
}

