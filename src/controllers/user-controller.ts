import * as userService from "../services/user-service";
import express, { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {

    let returnedResponse: any;
    let requestBody = req.body;

    returnedResponse = await userService.createUser(requestBody);

    res.status(201).send(returnedResponse);
}

/********************************************************************************/

const getUsers = async (req: Request, res: Response) => {

    let returnedResponse: any;
    returnedResponse = await userService.getUsers();

    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const updateUser = async (req: Request, res: Response) => {

    let returnedResponse: any;

    returnedResponse = await userService.updateUser(req);

    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const deleteUser = async (req: Request, res: Response) => {

    let returnedResponse: any;

    returnedResponse = await userService.deleteUser(req);

    res.status(200).send(returnedResponse);
}

export {
    createUser,
    getUsers,
    updateUser,
    deleteUser
};
