import { RequestHandler } from "express";
import { getFakeMessage } from "../../../models/Message";
import { getModelUser } from "../../../models/User";
import { UserRouteParams } from "./getUser";

const getUserMessage: RequestHandler<UserRouteParams> = (req, res, next) => {
    try {
        const user = getModelUser(parseInt(req.params.id))
        if (!user) throw new Error("not_found")

        res.json(getFakeMessage(user.id))
    } catch (error) {

    }
}

export default getUserMessage