import { PrismaClient } from "@prisma/client";
import { deleteComment, getCommentsByPostId } from "./comment-service";

const prisma = new PrismaClient();

/********************************************************************************/

const createPost = async (requestBody: any, userIdFromLocal: any) => {


    let userId = userIdFromLocal
    let createdPost: any;

    try {
        
        const postToCreate = await prisma.post.create({
            data: {
                htmlContent: requestBody.htmlContent,
                userId: userId
            },
        })

        createdPost = postToCreate
    } catch (error) {
        throw error
    }
    return createdPost
}

/********************************************************************************/

const getPosts = async () => {

    let foundPosts: any;

    try {
        const findPostsRequest = await prisma.post.findMany()

        foundPosts = findPostsRequest
    } catch (error) {
        throw error
    }
    return foundPosts
}

/********************************************************************************/

const updatePost = async (receivedRequest: any) => {

    let modifiedPost: any;

    try {
        const idInParameters = parseInt(receivedRequest.params.id)

        const requestBody = receivedRequest.body

        const modifiedPostRequest = await prisma.post.update({
            where: {
                id: idInParameters
            },
            data: {
                htmlContent: requestBody.htmlContent,
                userId: requestBody.userId
            },
        })

        modifiedPost = modifiedPostRequest
    } catch (error) {
        throw error
    }
    return modifiedPost
}

/********************************************************************************/

const deletePost = async (receivedRequest: any) => {
    
        let deletedPost: any;
        let deletedPostRequest;
    
        try {
            const idInParameters = parseInt(receivedRequest.params.id)
            
            const comments = await getCommentsByPostId(receivedRequest);

            console.log("comments : ", comments);
            
            let commentsDeleted = 0;

            if (comments.length > 0) {
                comments.forEach(async (comment: {id: number}) => {
                    await deleteComment(comment.id)
                    commentsDeleted++;
                    if(commentsDeleted === comments.length) {                    
                        deletedPostRequest = await prisma.post.delete({
                            where: {
                                id: idInParameters
                            },
                        })
                    }
                });
            } else {
                deletedPostRequest = await prisma.post.delete({
                    where: {
                        id: idInParameters
                    },
                })
            }

            deletedPost = deletedPostRequest

            return deletedPost
        } catch (error) {
            throw error
        }
}

export {
    createPost,
    getPosts,
    updatePost,
    deletePost
}