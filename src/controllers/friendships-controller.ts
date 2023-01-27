import { Request, Response } from "express";
import * as friendshipsService from "../services/friendships-service";

const createFriendship = async (req: Request, res: Response) => {
        
    let returnedResponse;
    let requestBody = req.body;
    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await friendshipsService.createFriendship(requestBody, userIdInResponseLocals);
        res.status(201).send(returnedResponse);
    }
    catch (error) {
        throw error;
    }
}

/********************************************************************************/

const getFriendshipsByUserId = async (req: Request, res: Response) => {
    let returnedResponse;

    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await friendshipsService.getFriendshipsByUserId(userIdInResponseLocals);
        res.status(200).send(returnedResponse);
    }
    catch (error) {
        throw error;
    }
}

/********************************************************************************/

const getFriendships = async (req: Request, res: Response) => {
    let returnedResponse;

    try {
        returnedResponse = await friendshipsService.getFriendships();
        res.status(200).send(returnedResponse);
    }
    catch (error) {
        throw error;
    }
}

const deleteFriendship = async (req: { params: { id: string; } }, res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await friendshipsService.deleteFriendship(req);
    } 
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

const updateFriendship = async (req: Request, res: Response) => {
    let returnedResponse;

    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await friendshipsService.updateFriendship(req, userIdInResponseLocals);
        res.status(200).send(returnedResponse);
    }
    catch (error: any) {
        res.status(400).send(error.message);
    }
}

export {
    createFriendship,
    getFriendshipsByUserId,
    deleteFriendship,
    getFriendships,
    updateFriendship
}
