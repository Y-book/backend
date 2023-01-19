import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/********************************************************************************/

const createComment = async (requestBody: any, userIdFromLocal: any) => {

    const userId = userIdFromLocal
    let createdComment: any;

    try {
        const commentToCreate = await prisma.postComment.create({
            data: {
                text: requestBody.text,
                userId: userId,
                postId: parseInt(requestBody.postId, 10)
            },
        })

        createdComment = commentToCreate
    } catch (error) {
        throw error
    }
    return createdComment
}

/********************************************************************************/

const getComments = async () => {

    let foundComments: any;

    try {
        const findCommentsRequest = await prisma.postComment.findMany()

        foundComments = findCommentsRequest
    } catch (error) {
        throw error
    }
    return foundComments
}

/********************************************************************************/

const getCommentsByPostId = async (receivedRequest: any) => {

    let foundComments: any;

    try {

        const postId = parseInt(receivedRequest.params.id)
        
        const findCommentsRequest = await prisma.postComment.findMany({
            where: {
                postId: postId,
            }
        })        

        foundComments = findCommentsRequest
    }
    catch (error) {
        throw error
    }

    return foundComments
}

/********************************************************************************/

const updateComment = async (receivedRequest: any, userIdFromLocal: any) => {

    const userId = userIdFromLocal;
    let modifiedComment: any;

    try {
        const idInParameters = parseInt(receivedRequest.params.id)

        const requestBody = receivedRequest.body

        const modifiedCommentRequest = await prisma.postComment.update({
            where: {
                id: idInParameters
            },
            data: {
                text: requestBody.text,
                userId: userId,
                postId: requestBody.postId,
            },
        })

        modifiedComment = modifiedCommentRequest
    } catch (error) {
        throw error
    }
    return modifiedComment
}

/********************************************************************************/

const deleteComment = async (commentId: number) => {
        
        let deletedComment: any;        
    
        try {
            const deletedCommentRequest = await prisma.postComment.delete({
                where: {
                    id: commentId
                },
            })
    
            deletedComment = deletedCommentRequest
        } catch (error) {
            throw error
        }
        return deletedComment
}

/********************************************************************************/

const deleteCommentsBeforePost = async (receivedRequest: any, idInParameters: any) => {
    const comments = await getCommentsByPostId(receivedRequest)
    if (comments.length > 0) {
        await prisma.postComment.deleteMany({
            where: {
            postId: idInParameters,
            },
        })
    }
}

export {
    createComment,
    getComments,
    getCommentsByPostId,
    updateComment,
    deleteComment,
    deleteCommentsBeforePost
}