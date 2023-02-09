import { Request, Response } from "express";
import * as conversationService from "../services/conversation-service";

const createConversation = async (req: Request, res: Response) => {
    
        let returnedResponse;
        const userIdInResponseLocals = res.locals.user.userId
        let requestBody = req.body;

    
        try {
            returnedResponse = await conversationService.createConversation(userIdInResponseLocals, requestBody);
            res.status(201).send(returnedResponse);
        } 
        catch (error: {message: string} | any) {
            res.status(400).send(error.message);
        }
    }

/********************************************************************************/

const getConversations = async (req: Request, res: Response) => {
            
    const userIdInResponseLocals = res.locals.user.userId
    let returnedResponse;

    try {
        returnedResponse = await conversationService.getConversations(userIdInResponseLocals);
        res.status(200).send(returnedResponse);
    } 
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

const getConversationById = async (req: { params: { id: string } }, res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await conversationService.getConversationById(req);
        res.status(200).send(returnedResponse);
    } 
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const deleteConversation = async (req: { params: { id: string } }, res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await conversationService.deleteConversation(req);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

export {
    createConversation,
    getConversations,
    getConversationById,
    deleteConversation,
}