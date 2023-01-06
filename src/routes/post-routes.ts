import express from "express"
import * as postController from "../controllers/post-controller"

const PostRouter = express.Router()

PostRouter
    .post("/", postController.createPost)
    .get("/", postController.getPosts)
    .patch("/:id", postController.updatePost)
    .delete("/:id", postController.deletePost)

export default PostRouter