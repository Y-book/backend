import { User } from "@prisma/client";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { RequestHandler } from "express";
import { getUserByMail } from "../services/user-service";

const verifyCognito: RequestHandler = async (req, res, next) => {

  // Verifier that expects valid access tokens:
  const verifier = CognitoJwtVerifier.create({
    userPoolId: `${process.env.COGNITO_USER_POOL_ID}`,
    tokenUse: "id",
    clientId: `${process.env.COGNITO_CLIENT_ID}`,
  });

  const token: string = <string>req.headers.token
    
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    token.split(" ")[0];

    const payload = await verifier.verify(
      token
    );

    res.locals.user = payload;

    let user;
    if (payload?.email) user = await getUserByMail(payload.email.toString());

    //Added the variable userId in the response locals
    if (user) payload["userId"] = user.id;

    next();
  } 
  catch (err: { message: string } | any) {
    res.send(err.message)
  }
}

export default verifyCognito;