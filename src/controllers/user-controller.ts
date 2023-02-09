import * as userService from "../services/user-service";
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {

    let returnedResponse;
    let requestBody = req.body;

    try {
        returnedResponse = await userService.createUser(requestBody);
        res.status(201).send(returnedResponse);
    } 
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const getUsers = async (res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await userService.getUsers();
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const getUsersWithResearch = async (req: Request, res: Response) => {
    
    let returnedResponse;

    try {
        returnedResponse = await userService.getUsersWithResearch(req);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const getUserById = async (req: { params: { id: string } }, res: Response) => {
    
    let returnedResponse;

    try {
        returnedResponse = await userService.getUserById(req);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

const getConnectedUserById = async (res: Response) => {
    
    let returnedResponse;
    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await userService.getConnectedUserById(userIdInResponseLocals);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const updateUser = async (req: { params: { id: string }, body: { firstname: string, lastname: string, email: string } }, res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await userService.updateUser(req);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const deleteUser = async (req: { params: { id: string } }, res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await userService.deleteUser(req);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

export {
    createUser,
    getUsers,
    getUserById,
    getConnectedUserById,
    updateUser,
    deleteUser,
    getUsersWithResearch
};
