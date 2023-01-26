import express from "express"
import * as messagingController from "../controllers/messaging-controller"
import verifyCognito from "../middlewares/verifyCognitoJwt"

const MessagingRouter = express.Router()

MessagingRouter
    .use(verifyCognito)
    .post("/", messagingController.createMessage)
    .get("/conversation/:id", messagingController.getMessagesPerConversation)
    .delete("/:id", messagingController.deleteMessage)

export default MessagingRouter