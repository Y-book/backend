import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (requestBody: {firstname: string, lastname: string, email: string}) => {

let createdUser;

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

    let foundUsers;

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

const getUserById = async (receivedRequest: {params: {id: string}}) => {

    let foundUser;    

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


const getConnectedUserById = async (userIdFromLocal: number) => {

    let foundUser;    

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

    let foundUser;

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

const getUsersWithResearch = async (receivedRequest: {body: {research: string}}) => {
    
        let foundUsers;
    
        try {
    
            const researchedTerm = receivedRequest.body.research

            if (researchedTerm.indexOf(' ') > -1 && researchedTerm.split(" ")[1] !== "") {
                const reserchArray = researchedTerm.split(" ");                
    
                const findUsersRequest = await prisma.user.findMany({
                    where: {
                        AND: [
                            {
                              OR: [
                                {
                                    firstname: {
                                        contains: reserchArray[0],
                                        mode: 'insensitive',
                                    }
                                },
                                {
                                    lastname: {
                                        contains: reserchArray[0],
                                        mode: 'insensitive',
                                    }
                                },
                              ]
                            },
                            {
                              OR: [
                                {
                                    firstname: {
                                        contains: reserchArray[1],
                                        mode: 'insensitive',
                                    }
                                },
                                {
                                    lastname: {
                                        contains: reserchArray[1],
                                        mode: 'insensitive',
                                    }
                                },
                              ]
                            }
                          ]
                    },
                    select: {
                        id: true,
                        email: true,
                        firstname: true,
                        lastname: true,
                    }
                })
        
                foundUsers = findUsersRequest
                
            } else {    
                const reserchArray = researchedTerm.split(" "); 
                const name = reserchArray[0]
                const findUsersRequest = await prisma.user.findMany({
                    where: {
                        OR: [
                            {
                                firstname: {
                                    contains: name,
                                    mode: 'insensitive',
                                }
                            },
                            {
                                lastname: {
                                    contains: name,
                                    mode: 'insensitive',
                                }
                            },
                        ]
                    },
                    select: {
                        id: true,
                        email: true,
                        firstname: true,
                        lastname: true,
                    }
                })
        
                foundUsers = findUsersRequest
            }
            
        }
        catch (error) {
            throw error
        }
    
        return foundUsers
}

/********************************************************************************/

const updateUser = async (receivedRequest: {params: {id: string}, body: {firstname: string, lastname: string, email: string}}) => {

    let modifiedUser;

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

const deleteUser = async (receivedRequest: {params: {id: string}}) => {

    let deletedUser;

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

