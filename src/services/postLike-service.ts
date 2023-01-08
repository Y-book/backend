import { PrismaClient } from "@prisma/client";
import jwt_decode from "jwt-decode";
import { getUserByMail } from "./user-service";

const prisma = new PrismaClient();

/********************************************************************************/

const createLike = async (receivedRequest: any) => {

    let createdLike: any;
    
    try {

        const requestBody = receivedRequest.body
        
        const likeToCreate = await prisma.postLike.create({
            data: {
                postId: parseInt(requestBody.postId, 10),
                userId: parseInt(requestBody.userId, 10)
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

const getLikeByPostIdAndUserId = async (receivedRequest: any) => {

    let foundLikes: any;

    try {
        const token = receivedRequest.headers.token;

        const decodedToken: {email: string} = jwt_decode(token);

        const user = await getUserByMail(decodedToken.email);

        const postId = parseInt(receivedRequest.params.id)
        
        const findLikesRequest = await prisma.postLike.findMany({
            where: {
                postId: postId,
                userId: user.id
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

export {
    createLike,
    getLikes,
    getLikeByPostIdAndUserId,
    getLikeByPostId,
    deleteLike
}