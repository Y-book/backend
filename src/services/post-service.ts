import { PrismaClient } from "@prisma/client";
import { deleteComment, deleteCommentsBeforePost, getCommentsByPostId } from "./comment-service";
import { deleteLike, deleteLikesBeforePost, getLikeByPostId } from "./postLike-service";

const prisma = new PrismaClient();

/********************************************************************************/

const createPost = async (requestBody: any, userIdFromLocal: any) => {

    const userId = userIdFromLocal
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
        // const findPostsRequest = await prisma.post.findMany()
        const findPostsRequest = await prisma.post.findMany({
            include: {
                _count: {
                    select: {
                    postLikes: true,
                    postComments: true,
                    },
                },
                postComments: {
                    select: {
                      id: true,
                      text: true,
                      userId: true
                    },
                },
            },
        })

        foundPosts = findPostsRequest
    } catch (error) {
        throw error
    }
    return foundPosts
}

/********************************************************************************/

const updatePost = async (receivedRequest: any, userIdFromLocal: any) => {

    const userId = userIdFromLocal;
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
                userId: userId
            },
        })

        modifiedPost = modifiedPostRequest
    } catch (error) {
        throw error
    }
    return modifiedPost
}

/********************************************************************************/

const test = function (likes: any) {
    return new Promise(() => {
        let deletedLikes = 0;

        likes.forEach(async (like: {id: number}) => {
            await deleteLike(like.id)
            deletedLikes++
            if (deletedLikes >= likes.length) {
                return true;
            }
        })
    });
}

const deletePost = async (receivedRequest: any) => {
        let deletedPost: any;
        let deletedPostRequest;
    
        try {
            const idInParameters = parseInt(receivedRequest.params.id)

            await deleteCommentsBeforePost(receivedRequest, idInParameters);
            await deleteLikesBeforePost(receivedRequest, idInParameters);
            
            deletedPostRequest = await prisma.post.delete({
                where: {
                    id: idInParameters
                },
            })

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