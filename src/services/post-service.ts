import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



/********************************************************************************/

const createPost = async (requestBody: any) => {

    let createdPost: any;

    try {
        const postToCreate = await prisma.post.create({
            data: {
                htmlContent: requestBody.htmlContent,
                userId: requestBody.userId
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

export { createPost,
         getPosts }