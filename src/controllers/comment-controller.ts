import * as commentService from '../services/comment-service'
import express, { Request, Response } from 'express'

const createComment = async (req: Request, res: Response) => {

    let returnedResponse: any;
    let requestBody = req.body;

    try {
        returnedResponse = await commentService.createComment(requestBody);
    } 
    catch (error) {
        throw error;
    }
    res.status(201).send(returnedResponse);
}

/********************************************************************************/

const getComments = async (req: Request, res: Response) => {
    
        let returnedResponse: any;
    
        try {
            returnedResponse = await commentService.getComments();
        }
        catch (error) {
            throw error;
        }
        res.status(200).send(returnedResponse);
}

const getCommentsByPostId = async (req: Request, res: Response) => {
    
    let returnedResponse: any;

    try {
        returnedResponse = await commentService.getCommentsByPostId(req);
    }
    catch (error) {
        throw error;
    }
    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const updateComment = async (req: Request, res: Response) => {
    
        let returnedResponse: any;
    
        try {
            returnedResponse = await commentService.updateComment(req);
        }
        catch (error) {
            throw error;
        }
    
        res.status(200).send(returnedResponse);
}

/********************************************************************************/

const deleteComment = async (req: Request, res: Response) => {
        
            let returnedResponse: any;
        
            try {
                returnedResponse = await commentService.deleteComment(parseInt(req.params.id, 10));
            }
            catch (error) {
                throw error;
            }
        
            res.status(200).send(returnedResponse);
}

export { createComment, getComments, getCommentsByPostId, updateComment, deleteComment }