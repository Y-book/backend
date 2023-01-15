import * as postLikeServices from '../services/postLike-service'
import { Request, Response } from 'express'

const createLike = async (req: Request, res: Response) => {
    
    let returnedResponse: any;
    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await postLikeServices.createLike(req, userIdInResponseLocals);
    }
    catch (error) {
        throw error;
    }

    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const getLikes = async (req: Request, res: Response) => {
    
    let returnedResponse: any;

    try {
        returnedResponse = await postLikeServices.getLikes();
    }
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const getLikeByPostIdAndUserId = async (req: Request, res: Response) => {
    
    let returnedResponse: any;
    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await postLikeServices.getLikeByPostIdAndUserId(req, userIdInResponseLocals);
    }
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const getLikeByPostId = async (req: Request, res: Response) => {
    
    let returnedResponse: any;

    try {
        returnedResponse = await postLikeServices.getLikeByPostId(req);
    }
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const deleteLike = async (req: Request, res: Response) => {

    let returnedResponse: any;

    try {
        returnedResponse = await postLikeServices.deleteLike(req);
    }
    catch (error) {
        throw error;
    }
    
    res.status(200).send(returnedResponse);
}

export { createLike, getLikes, getLikeByPostIdAndUserId, getLikeByPostId, deleteLike }