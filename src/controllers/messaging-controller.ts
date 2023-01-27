import { Request, Response } from "express";
import * as messageService from "../services/messaging-service";

const createMessage = async (req: Request, res: Response) => {

    let returnedResponse;
    const userIdInResponseLocals = res.locals.user.userId
    let requestBody = req.body;

    try {
        returnedResponse = await messageService.createMessage(userIdInResponseLocals, requestBody);
        res.status(201).send(returnedResponse);
    }
    catch (error) {
        throw error;
    }
}

/********************************************************************************/

const getMessagesPerConversation = async (req: Request, res: Response) => {

    let returnedResponse;
    const idInParameters = parseInt(req.params.id)

    try {
        returnedResponse = await messageService.getMessagesPerConversation(idInParameters);
        res.status(200).send(returnedResponse);
    }
    catch (error) {
        throw error;
    }
}

/********************************************************************************/

const deleteMessage = async (req: Request, res: Response) => {

    let returnedResponse;
    let idInParameters = parseInt(req.params.id);

    try {
        returnedResponse = await messageService.deleteMessage(idInParameters);
        res.status(200).send(returnedResponse);
    }
    catch (error) {
        throw error;
    }
}


export {
    createMessage,
    getMessagesPerConversation,
    deleteMessage,
}