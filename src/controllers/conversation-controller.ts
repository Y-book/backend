import { Request, Response } from "express";
import * as conversationService from "../services/conversation-service";

const createConversation = async (req: Request, res: Response) => {
    
        let returnedResponse: any;
        let requestBody = req.body;
    
        try {
            returnedResponse = await conversationService.createConversation(requestBody);
        } 
        catch (error) {
            throw error;
        }
        res.status(201).send(returnedResponse);
    }

const getConversations = async (req: Request, res: Response) => {
            
                let returnedResponse: any;
            
                try {
                    returnedResponse = await conversationService.getConversations();
                } 
                catch (error) {
                    throw error;
                }
                res.status(200).send(returnedResponse);
            }

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