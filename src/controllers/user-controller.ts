import * as userService from "../services/user-service";
import express, { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {

    let returnedResponse: any;
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

    let returnedResponse: any;

    try {
        returnedResponse = await userService.getUsers();
    }
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const updateUser = async (req: Request, res: Response) => {

    let returnedResponse: any;

    try {
        returnedResponse = await userService.updateUser(req);
    }
    catch (error) {
        throw error;
    }

    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const deleteUser = async (req: Request, res: Response) => {

    let returnedResponse: any;

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
    updateUser,
    deleteUser
};
