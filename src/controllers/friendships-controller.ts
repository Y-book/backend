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
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
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
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const getFriendships = async (req: Request, res: Response) => {
    let returnedResponse;

    try {
        returnedResponse = await friendshipsService.getFriendships();
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);;
    }
}

const deleteFriendship = async (req: { params: { id: string; } }, res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await friendshipsService.deleteFriendship(req);
        res.status(200).send(returnedResponse);
    } 
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

const updateFriendship = async (req: Request, res: Response) => {
    let returnedResponse;

    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await friendshipsService.updateFriendship(req, userIdInResponseLocals);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
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
