import express from "express"
import User from "../controllers/User"

const UserRouter = express.Router()

UserRouter.get("/:id", User.getUser)
UserRouter.get("/:id/message", User.getUserMessage)

export default UserRouter