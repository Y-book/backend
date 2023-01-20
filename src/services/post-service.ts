import { PrismaClient } from "@prisma/client";
import { deleteCommentsBeforePost } from "./comment-service";
import { deleteLikesBeforePost } from "./postLike-service";

const prisma = new PrismaClient();

/********************************************************************************/

const createPost = async (requestBody: any, userIdFromLocal: any) => {

    let createdPost: any;

    try {
        
        const postToCreate = await prisma.post.create({
            data: {
                htmlContent: requestBody.htmlContent,
                userId: userIdFromLocal
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

const getPostsByUserId = async (userIdFromLocal: any) => {

    let foundPosts: any;

    try {
        // const findPostsRequest = await prisma.post.findMany()
        const findPostsRequest = await prisma.post.findMany({
            where: {
                userId: userIdFromLocal,
            },
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

const getPostsByLikesId = async (userIdFromLocal: any) => {

    let foundPosts = [];

    try {

        const posts = await prisma.post.findMany({
            where: {
                postLikes: {
                    some: {
                        userId: userIdFromLocal
                    }
                }
            },
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

        foundPosts = posts

    } catch (error) {
        throw error
    }
    return foundPosts
}

const getPostsByCommentsId = async (userIdFromLocal: any) => {

    let foundPosts = [];

    try {

        const post = await prisma.post.findMany({
            where: {
                postComments: {
                    some: {
                        userId: userIdFromLocal
                    }
                }
            },
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
        
        foundPosts = post        

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
    getPostsByUserId,
    getPostsByLikesId,
    getPostsByCommentsId,
    updatePost,
    deletePost
}