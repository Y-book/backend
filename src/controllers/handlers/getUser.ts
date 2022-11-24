import { RequestHandler } from "express";
export type UserRoutParams = {
    id: number;
};

const getUser: RequestHandler<UserRoutParams> = (req, res, next) => {
   try {
       const user = fakeDataUser.find((item) => item.id === req.params.id);
   } catch (error) {
         next(error);
    }
}

export default getUser;