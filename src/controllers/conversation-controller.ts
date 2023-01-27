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
        catch (error) {
            throw error;
        }
    }

/********************************************************************************/

const getConversations = async (req: Request, res: Response) => {
            
    const userIdInResponseLocals = res.locals.user.userId
    let returnedResponse;

    try {
        returnedResponse = await conversationService.getConversations(userIdInResponseLocals);
    } 
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

const getConversationById = async (req: { params: { id: string } }, res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await conversationService.getConversationById(req);
    } 
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const deleteConversation = async (req: { params: { id: string } }, res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await conversationService.deleteConversation(req);
    }
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

export {
    createConversation,
    getConversations,
    getConversationById,
    deleteConversation,
}