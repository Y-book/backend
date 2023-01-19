import express from "express"
import * as friendshipsController from "../controllers/friendships-controller"

const FriendshipsRouter = express.Router()

FriendshipsRouter
    .post("/", friendshipsController.createFriendship)
    .get("/", friendshipsController.getFriendships)
    .get("/:id", friendshipsController.getFriendshipsById)
    .delete("/:id", friendshipsController.deleteFriendship)

export default FriendshipsRouter