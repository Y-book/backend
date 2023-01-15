import express from "express"
import * as commentController from "../controllers/comment-controller"
import verifyCognito from "../middlewares/verifyCognitoJwt"

const CommentRouter = express.Router()

CommentRouter
    .use(verifyCognito)
    .post("/", commentController.createComment)
    .get("/", commentController.getComments)
    .get("/post/:id", commentController.getCommentsByPostId)
    .patch("/:id", commentController.updateComment)
    .delete("/:id", commentController.deleteComment)

export default CommentRouter