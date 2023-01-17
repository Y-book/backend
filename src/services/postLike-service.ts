import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/********************************************************************************/

const createLike = async (receivedRequest: any,userIdFromLocal: any) => {

    const userId = userIdFromLocal
    let createdLike: any;
    
    try {
        const requestBody = receivedRequest.body
        
        const likeToCreate = await prisma.postLike.create({
            data: {
                postId: parseInt(requestBody.postId, 10),
                userId: userIdFromLocal
            },
        })

        createdLike = likeToCreate
        
    } catch (error) {
        throw error
    }
    return createdLike
}

/********************************************************************************/

const getLikes = async () => {

    let foundLikes: any;

    try {
        const findLikesRequest = await prisma.postLike.findMany()

        foundLikes = findLikesRequest
    } catch (error) {
        throw error
    }
    return foundLikes
}

/********************************************************************************/

const getLikeByPostId = async (receivedRequest: any) => {

    let foundLikes: any;

    try {
        const postId = parseInt(receivedRequest.params.id)
        
        const findLikesRequest = await prisma.postLike.findMany({
            where: {
                postId: postId,
            }
        })        

        foundLikes = findLikesRequest
    }
    catch (error) {
        throw error
    }

    return foundLikes
}

/********************************************************************************/

const getLikeByPostIdAndUserId = async (receivedRequest: any, userIdFromLocal: any) => {

    const userId = userIdFromLocal
    let foundLikes: any;

    try {
        const findLikesRequest = await prisma.postLike.findMany({
            where: {
                postId: parseInt(receivedRequest.params.id),
                userId: userIdFromLocal
            }
        })

        foundLikes = findLikesRequest
    }
    catch (error) {
        throw error
    }

    return foundLikes
}

/********************************************************************************/

const deleteLike = async (receivedRequest: any) => {

    let deletedLike: any;

    try {
        const idInParameters = parseInt(receivedRequest.params.id)

        const deleteLikeRequest = await prisma.postLike.delete({
            where: {
                id: idInParameters
            }
        })

        deletedLike = deleteLikeRequest
    }
    catch (error) {
        throw error
    }

    return deletedLike
}

const deleteLikesBeforePost = async (receivedRequest: any, idInParameters: any) => {
    const likes = await getLikeByPostId(receivedRequest)
    if (likes.length > 0) {
        await prisma.postComment.deleteMany({
            where: {
            postId: idInParameters,
            },
        })
    }
}

export {
    createLike,
    getLikes,
    getLikeByPostIdAndUserId,
    getLikeByPostId,
    deleteLike,
    deleteLikesBeforePost
}