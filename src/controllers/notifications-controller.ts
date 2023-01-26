import express, { Request, Response } from "express";
import * as notificationService from "../services/notifications-service";

const createFriendshipNotification = async (req: Request, res: Response) => {

    let returnedResponse: any;
    let requestBody = req.body;

    try {
        returnedResponse = await notificationService.createFriendshipNotification(requestBody);
        res.status(201).send(returnedResponse);
    }
    catch (error) {
        throw error;
    }
}

export {
    createFriendshipNotification
}