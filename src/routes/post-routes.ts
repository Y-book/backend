import express from "express"
import * as postController from "../controllers/post-controller"

const PostRouter = express.Router()

PostRouter
    .post("/", postController.createPost)
    .get("/", postController.getPosts)

export default PostRouter