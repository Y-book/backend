import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/********************************************************************************/

const createComment = async (requestBody: {postId: string, text: string}, userIdFromLocal: number) => {

    const userId = userIdFromLocal
    let createdComment;

    try {
        const commentToCreate = await prisma.postComment.create({
            data: {
                text: requestBody.text,
                userId: userId,
                postId: parseInt(requestBody.postId, 10)
            },
        })

        const response = getComment(commentToCreate.id)

        createdComment = response
    } catch (error) {
        throw error
    }
    return createdComment
}

/********************************************************************************/

const getComment = async (id: number) => {

    let foundComments;

    try {
        const findCommentsRequest = await prisma.postComment.findUnique({
            where: {
                id: id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstname: true,
                        lastname: true,
                    }
                }
            }
        })

        foundComments = findCommentsRequest
    } catch (error) {
        throw error
    }
    return foundComments
}

const getComments = async () => {

    let foundComments;

    try {
        const findCommentsRequest = await prisma.postComment.findMany()

        foundComments = findCommentsRequest
    } catch (error) {
        throw error
    }
    return foundComments
}

/********************************************************************************/

const getCommentsByPostId = async (receivedRequest: {params: {id: string}}) => {

    let foundComments;

    try {

        const postId = parseInt(receivedRequest.params.id)
        
        const findCommentsRequest = await prisma.postComment.findMany({
            where: {
                postId: postId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstname: true,
                        lastname: true,
                    }
                }
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

const updateComment = async (receivedRequest: {params: {id: string}, body: {text: string, postId: number}}, userIdFromLocal: number) => {

    let modifiedComment;

    try {
        const idInParameters = parseInt(receivedRequest.params.id)

        const requestBody = receivedRequest.body

        const modifiedCommentRequest = await prisma.postComment.update({
            where: {
                id: idInParameters
            },
            data: {
                text: requestBody.text,
                userId: userIdFromLocal,
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
        
        let deletedComment;        
    
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

const deleteCommentsBeforePost = async (receivedRequest: { params: { id: string; }; }, idInParameters: number) => {
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