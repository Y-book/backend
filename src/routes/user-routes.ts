import express from "express"
import * as userController from "../controllers/user-controller"
import verifyCognito from "../middlewares/verifyCognitoJwt"

const UserRouter = express.Router()

UserRouter
    .post("/", userController.createUser)
    .use(verifyCognito)
    .get("/all", userController.getUsers)
    .post("/search-users", userController.getUsersWithResearch)
    .get("/", userController.getConnectedUserById)
    .get("/:id", userController.getUserById)
    .patch("/:id", userController.updateUser)
    .delete("/:id", userController.deleteUser)

export default UserRouter