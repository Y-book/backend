import express from "express"
import * as postLikeController from "../controllers/postLike-controller"

const PostLikeRouter = express.Router()

PostLikeRouter
    .post("/", postLikeController.createLike)
    .get("/", postLikeController.getLikes)
    .get("/post/:id/all", postLikeController.getLikeByPostId)
    .get("/post/:id", postLikeController.getLikeByPostIdAndUserId)
    .delete("/:id", postLikeController.deleteLike)

export default PostLikeRouter