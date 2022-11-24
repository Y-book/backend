import { RequestHandler } from "express";

const users = [
    { user: "julien", key: "verygoodsecurity" },
    { user: "romain", key: "verygoodsecuritylol" },
]

const AuthMiddleware: RequestHandler = (req, res, next) => {
    try {
        const apiUser = req.headers["x-ybook-api-user"]
        const apiKey = req.headers["x-ybook-api-key"]
        if (!(apiUser && apiKey)) throw new Error("missing_auth_parameters")

        const userFound = users.find((user) => user.user === apiUser && user.key === apiKey)
        if (!userFound) throw new Error("bad_auth")

        next()
    } catch (error) {
        next(error)
    }
}

export default AuthMiddleware