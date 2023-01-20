import express from "express"
import * as friendshipsController from "../controllers/friendships-controller"

const FriendshipsRouter = express.Router()

FriendshipsRouter
    .post("/", friendshipsController.createFriendship)
    .get("/:id", friendshipsController.getFriendshipsByUserId)
    .get("/", friendshipsController.getFriendships)
    .delete("/:id", friendshipsController.deleteFriendship)

export default FriendshipsRouter