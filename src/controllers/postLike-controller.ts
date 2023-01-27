import * as postLikeServices from '../services/postLike-service'
import { Request, Response } from 'express'

const createLike = async (req: Request, res: Response) => {
    
    let returnedResponse;
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
    
    let returnedResponse;

    try {
        returnedResponse = await postLikeServices.getLikes();
    }
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const getLikeByPostIdAndUserId = async (req: { params: { id: string } }, res: Response) => {
    
    let returnedResponse;
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

const getLikeByPostId = async (req: { params: { id: string } }, res: Response) => {
    
    let returnedResponse;

    try {
        returnedResponse = await postLikeServices.getLikeByPostId(req);
    }
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const deleteLike = async (req: { params: { id: string } }, res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await postLikeServices.deleteLike(req);
    }
    catch (error) {
        throw error;
    }
    
    res.status(200).send(returnedResponse);
}

export { createLike, getLikes, getLikeByPostIdAndUserId, getLikeByPostId, deleteLike }