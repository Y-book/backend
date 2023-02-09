import * as postService from '../services/post-service'
import express, { request, Request, Response } from 'express'

const createPost = async (req: Request, res: Response) => {

    let returnedResponse;
    let requestBody = req.body;
    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await postService.createPost(requestBody, userIdInResponseLocals);
        res.status(201).send(returnedResponse);
    } 
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const getPosts = async (req: Request, res: Response) => {
    
    let returnedResponse;

    try {
        returnedResponse = await postService.getPosts();
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

const getPostsByUserId = async (req: Request, res: Response) => {
    
    let returnedResponse;
    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await postService.getPostsByUserId(userIdInResponseLocals);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

const getPostsByLikesId = async (req: Request, res: Response) => {
    
    let returnedResponse;
    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await postService.getPostsByLikesId(userIdInResponseLocals);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

const getPostsByCommentsId = async (req: Request, res: Response) => {
    
    let returnedResponse;
    const userIdInResponseLocals = res.locals.user.userId;

    try {
        returnedResponse = await postService.getPostsByCommentsId(userIdInResponseLocals);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const updatePost = async (req: { params: { id: string; }, body: { htmlContent: string; } }, res: Response) => {

    const userIdInResponseLocals = res.locals.user.userId;
    let returnedResponse;

    try {
        returnedResponse = await postService.updatePost(req, userIdInResponseLocals);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

/********************************************************************************/

const deletePost = async (req: { params: { id: string; } }, res: Response) => {
        
    let returnedResponse;

    try {
        returnedResponse = await postService.deletePost(req);
        res.status(200).send(returnedResponse);
    }
    catch (error: {message: string} | any) {
        res.status(400).send(error.message);
    }
}

export { 
    createPost, 
    getPosts, 
    getPostsByUserId,
    getPostsByLikesId,
    getPostsByCommentsId,
    updatePost,
    deletePost
}