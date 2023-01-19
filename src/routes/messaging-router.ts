import express from "express"
import * as messagingController from "../controllers/messaging-controller"

const MessagingRouter = express.Router()

MessagingRouter
    .post("/", messagingController.createMessage)
    .get("/", messagingController.getMessages)
    .delete("/:id", messagingController.deleteMessage)

export default MessagingRouter