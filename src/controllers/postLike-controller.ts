import * as postLikeServices from '../services/postLike-service'
import { Request, Response } from 'express'

const createLike = async (req: Request, res: Response) => {
    
    let returnedResponse;
    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await postLikeServices.createLike(req, userIdInResponseLocals);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const getLikes = async (res: Response) => {
    
    let returnedResponse;

    try {
        returnedResponse = await postLikeServices.getLikes();
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const getLikeByPostIdAndUserId = async (req: { params: { id: string } }, res: Response) => {
    
    let returnedResponse;
    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await postLikeServices.getLikeByPostIdAndUserId(req, userIdInResponseLocals);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const getLikeByPostId = async (req: { params: { id: string } }, res: Response) => {
    
    let returnedResponse;

    try {
        returnedResponse = await postLikeServices.getLikeByPostId(req);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const deleteLike = async (req: { params: { id: string } }, res: Response) => {

    let returnedResponse;

    try {
        returnedResponse = await postLikeServices.deleteLike(req);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

export {
    createLike,
    getLikes,
    getLikeByPostIdAndUserId,
    getLikeByPostId,
    deleteLike
}