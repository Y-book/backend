import { Request, Response } from "express";
import * as friendshipsService from "../services/friendships-service";

const createFriendship = async (req: Request, res: Response) => {
        
            let returnedResponse: any;
            let requestBody = req.body;
        
            try {
                returnedResponse = await friendshipsService.createFriendship(requestBody);
            } 
            catch (error) {
                throw error;
            }
            res.status(201).send(returnedResponse);
        }

const getFriendshipsByUserId = async (req: Request, res: Response) => {
    let returnedResponse: any;

    try {
        returnedResponse = await friendshipsService.getFriendshipsByUserId(req);
    }
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

const getFriendships = async (req: Request, res: Response) => {
    let returnedResponse: any;

    try {
        returnedResponse = await friendshipsService.getFriendships();
    }
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

const deleteFriendship = async (req: Request, res: Response) => {

                                    let returnedResponse: any;
                                
                                    try {
                                    returnedResponse = await friendshipsService.deleteFriendship(req);
                                    } 
                                    catch (error) {
                                        throw error;
                                    }
                                    res.status(200).send(returnedResponse);
                                }

export {
    createFriendship,
    getFriendshipsByUserId,
    deleteFriendship,
    getFriendships
}
