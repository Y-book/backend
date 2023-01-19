import express from "express"
import * as conversationController from "../controllers/conversation-controller"

const ConversationRouter = express.Router()

ConversationRouter
    .post("/", conversationController.createConversation)
    .get("/", conversationController.getConversations)
    .delete("/:id", conversationController.deleteConversation)

export default ConversationRouter