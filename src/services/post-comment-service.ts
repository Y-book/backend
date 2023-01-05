import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPostComment = async (requestBody: any) => {

    let createdPostComment: any;

    try {
        const postCommentToCreate = await prisma.postComment.create({
            data: {
                text: requestBody.text,
                postId: requestBody.postId,
                userId: requestBody.userId,
            },
        })
        createdPostComment = postCommentToCreate

    } catch (error) {
        throw error
    }
    return createdPostComment
}

export { createPostComment };