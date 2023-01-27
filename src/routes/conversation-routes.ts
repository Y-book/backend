import express from "express"
import * as conversationController from "../controllers/conversation-controller"
import verifyCognito from "../middlewares/verifyCognitoJwt"

const ConversationRouter = express.Router()

ConversationRouter
    .use(verifyCognito)
    .post("/", conversationController.createConversation)
    .get("/", conversationController.getConversations)
    .get("/:id", conversationController.getConversationById)
    .delete("/:id", conversationController.deleteConversation)

export default ConversationRouter