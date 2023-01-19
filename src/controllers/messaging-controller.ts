import { Request, Response } from "express";
import * as messageService from "../services/messaging-service";

const createMessage = async (req: Request, res: Response) => {
    
        let returnedResponse: any;
        let requestBody = req.body;
    
        try {
            returnedResponse = await messageService.createMessage(requestBody);
        } 
        catch (error) {
            throw error;
        }
        res.status(201).send(returnedResponse);
    }

const getMessages = async (req: Request, res: Response) => {
        
            let returnedResponse: any;
        
            try {
                returnedResponse = await messageService.getMessages();
            } 
            catch (error) {
                throw error;
            }
            res.status(200).send(returnedResponse);
        }

const deleteMessage = async (req: Request, res: Response) => {
                
                    let returnedResponse: any;
                
                    try {
                    returnedResponse = await messageService.deleteMessage(req);
                    } 
                    catch (error) {
                        throw error;
                    }
                    res.status(200).send(returnedResponse);
                }

export {
    createMessage,
    getMessages,
    deleteMessage,
}