import * as postService from '../services/post-service'
import express, { Request, Response } from 'express'

const createPost = async (req: Request, res: Response) => {

    let returnedResponse: any;
    let requestBody = req.body;

    try {
        returnedResponse = await postService.createPost(requestBody);
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

export { createPost, 
        getPosts }