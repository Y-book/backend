import * as postService from '../services/post-service'
import express, { request, Request, Response } from 'express'

const createPost = async (req: Request, res: Response) => {

    let returnedResponse: any;
    let requestBody = req.body;
    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await postService.createPost(requestBody, userIdInResponseLocals);
    } 
    catch (error) {
        throw error;
    }
    res.status(201).send(returnedResponse);
}

/********************************************************************************/

const getPosts = async (req: Request, res: Response) => {
    
        let returnedResponse: any;
    
        try {
            returnedResponse = await postService.getPosts();
        }
        catch (error) {
            throw error;
        }
        res.status(200).send(returnedResponse);
}

/********************************************************************************/

const updatePost = async (req: Request, res: Response) => {

    const userIdInResponseLocals = res.locals.user.userId;
    let returnedResponse: any;

    try {
        returnedResponse = await postService.updatePost(req, userIdInResponseLocals);
    }
    catch (error) {
        throw error;
    }

    res.status(200).send(returnedResponse);
}

/********************************************************************************/

const deletePost = async (req: Request, res: Response) => {
        
            let returnedResponse: any;
        
            try {
                returnedResponse = await postService.deletePost(req);
            }
            catch (error) {
                throw error;
            }
        
            res.status(200).send(returnedResponse);
}

export { createPost, 
        getPosts, 
        updatePost,
        deletePost }