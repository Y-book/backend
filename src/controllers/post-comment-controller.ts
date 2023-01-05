import * as postCommentService from "../services/post-comment-service";
import express, { Request, Response } from "express";

const createPostComment = async (req: Request, res: Response) => {

    let returnedResponse: any;
    let requestBody = req.body;

    try {
        returnedResponse = await postCommentService.createPostComment(requestBody);
    } 
    catch (error) {
        throw error;
    }
    res.status(201).send(returnedResponse);
   
}