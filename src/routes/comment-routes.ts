import express from "express"
import * as commentController from "../controllers/comment-controller"

const CommentRouter = express.Router()

CommentRouter
    .post("/", commentController.createComment)
    .get("/", commentController.getComments)
    .get("/post/:id", commentController.getCommentsByPostId)
    .patch("/:id", commentController.updateComment)
    .delete("/:id", commentController.deleteComment)

export default CommentRouter