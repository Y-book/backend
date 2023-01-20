import express from "express"
import * as postController from "../controllers/post-controller"
import verifyCognito from "../middlewares/verifyCognitoJwt"

const PostRouter = express.Router()

PostRouter
    .use(verifyCognito)
    .post("/", postController.createPost)
    .get("/all", postController.getPosts)
    .get("/", postController.getPostsByUserId)
    .get("/likes", postController.getPostsByLikesId)
    .get("/comments", postController.getPostsByCommentsId)
    .patch("/:id", postController.updatePost)
    .delete("/:id", postController.deletePost)


export default PostRouter