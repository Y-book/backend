import express from "express"
import * as postLikeController from "../controllers/postLike-controller"
import verifyCognito from "../middlewares/verifyCognitoJwt"

const PostLikeRouter = express.Router()

PostLikeRouter
    .use(verifyCognito)
    .post("/", postLikeController.createLike)
    .get("/", postLikeController.getLikes)
    // .get("/post/:id/all", postLikeController.getLikeByPostId)
    .get("/:id", postLikeController.getLikeByPostIdAndUserId)
    .delete("/:id", postLikeController.deleteLike)

export default PostLikeRouter