import * as commentService from '../services/comment-service'
import express, { Request, Response } from 'express'

const createComment = async (req: Request, res: Response) => {

    let returnedResponse;
    let requestBody = req.body;
    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await commentService.createComment(requestBody, userIdInResponseLocals);
        res.status(201).send(returnedResponse);
    } 
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const getComments = async (req: Request, res: Response) => {
    
        let returnedResponse;
    
        try {
            returnedResponse = await commentService.getComments();
            res.status(200).send(returnedResponse);
        }
        catch (error: {message: string} | any) {
            res.status(400).send(error.message);
        }
}

/********************************************************************************/

const getCommentsByPostId = async (req: { params: { id: string; } }, res: Response) => {
    
    let returnedResponse;

    try {
        returnedResponse = await commentService.getCommentsByPostId(req);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const updateComment = async (req: { params: { id: string; }; body: { text: string; postId: number; }; }, res: Response) => {
    
        let returnedResponse;
        const userIdInResponseLocals = res.locals.user.userId;
    
        try {
            returnedResponse = await commentService.updateComment(req, userIdInResponseLocals);
            res.status(200).send(returnedResponse);
        }
        catch (error: {message: string} | any) {
            res.status(400).send(error.message);
        }
}

/********************************************************************************/

const deleteComment = async (req: Request, res: Response) => {
        
            let returnedResponse;
        
            try {
                returnedResponse = await commentService.deleteComment(parseInt(req.params.id, 10));
                res.status(200).send(returnedResponse);
            }
            catch (error: {message: string} | any) {
                res.status(400).send(error.message);
            }
}

export {
    createComment,
    getComments,
    getCommentsByPostId,
    updateComment,
    deleteComment
}