import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (requestBody: any) => {

    const createdUser = await prisma.user.create({
        data: {
            firstname: requestBody.firstname,
            lastname: requestBody.lastname,
            email: requestBody.email,
        },
    })

    return createdUser
}

/********************************************************************************/

const getUsers = async () => {

    const foundUsers = await prisma.user.findMany()

    return foundUsers
}

/********************************************************************************/

const updateUser = async (receivedRequest: any) => {

    const idInParameters = parseInt(receivedRequest.params.id)

    const requestBody = receivedRequest.body

    const modifiedUser = await prisma.user.update({
        where: {
            id: idInParameters
        },
        data: {
            firstname: requestBody.firstname,
            lastname: requestBody.lastname,
            email: requestBody.email,
        }
    })

    return modifiedUser
}

/********************************************************************************/

const deleteUser = async (receivedRequest: any) => {

    const idInParameters = parseInt(receivedRequest.params.id)

    const deletedUser = await prisma.user.delete({
        where: {
            id: idInParameters
        }
    })

    return deletedUser
}

export {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}

