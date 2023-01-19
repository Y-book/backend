import { RequestHandler } from "express";
export type UserRoutParams = {
    id: number;
};

const getUser: RequestHandler<UserRoutParams> = (req, res, next) => {
    res.send({ title: 'Express' });
}

export default getUser;
