import express from "express"
import * as friendshipsController from "../controllers/friendships-controller"
import verifyCognito from "../middlewares/verifyCognitoJwt"

const FriendshipsRouter = express.Router()

FriendshipsRouter
    .use(verifyCognito)
    .post("/", friendshipsController.createFriendship)
    .get("/", friendshipsController.getFriendshipsByUserId)
    // .get("/", friendshipsController.getFriendships)
    .delete("/:id", friendshipsController.deleteFriendship)

export default FriendshipsRouter