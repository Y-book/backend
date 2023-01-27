import * as userService from "../services/user-service";
import express, { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {

    let returnedResponse;
    let requestBody = req.body;

    try {
        returnedResponse = await userService.createUser(requestBody);
    } 
    catch (error) {
        throw error;
    }
    res.status(201).send(returnedResponse);
}

/********************************************************************************/

const getUsers = async (req: Request, res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await userService.getUsers();
    }
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const getUsersWithResearch = async (req: Request, res: Response) => {
    
    let returnedResponse;

    try {
        returnedResponse = await userService.getUsersWithResearch(req);
        res.status(200).send(returnedResponse);
    }
    catch (error) {
        throw error;
    }
}

/********************************************************************************/

const getUserById = async (req: { params: { id: string } }, res: Response) => {
    
    let returnedResponse;

    try {
        returnedResponse = await userService.getUserById(req);
    }
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

const getConnectedUserById = async (req: Request, res: Response) => {
    
    let returnedResponse;
    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await userService.getConnectedUserById(userIdInResponseLocals);
    }
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const updateUser = async (req: { params: { id: string }, body: { firstname: string, lastname: string, email: string } }, res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await userService.updateUser(req);
    }
    catch (error) {
        throw error;
    }

    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const deleteUser = async (req: { params: { id: string } }, res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await userService.deleteUser(req);
    }
    catch (error) {
        throw error;
    }
    
    res.status(200).send(returnedResponse);
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
