import { Request, Response } from "express";
import * as conversationService from "../services/conversation-service";

const createConversation = async (req: Request, res: Response) => {
    
        let returnedResponse: any;
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
                let returnedResponse: any;
            
                try {
                    returnedResponse = await conversationService.getConversations(userIdInResponseLocals);
                } 
                catch (error) {
                    throw error;
                }
                res.status(200).send(returnedResponse);
            }

/********************************************************************************/

const deleteConversation = async (req: Request, res: Response) => {
                            
                                let returnedResponse: any;
                            
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
    deleteConversation,
}