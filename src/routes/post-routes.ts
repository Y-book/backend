import express from "express"
import * as postController from "../controllers/post-controller"
import verifyCognito from "../middlewares/verifyCognitoJwt"

const PostRouter = express.Router()

PostRouter
    .use(verifyCognito)
    .post("/", postController.createPost)
    .get("/", postController.getPosts)
    .patch("/:id", postController.updatePost)
    .delete("/:id", postController.deletePost)


export default PostRouter