import express from "express"
import * as userController from "../controllers/user-controller"

const UserRouter = express.Router()

UserRouter
    .post("/", userController.createUser)
    .get("/", userController.getUsers)
    .get("/:id", userController.getUserById)
    .patch("/:id", userController.updateUser)
    .delete("/:id", userController.deleteUser)

export default UserRouter