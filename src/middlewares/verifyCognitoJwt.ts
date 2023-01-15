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
    // console.log("Token is valid. Payload:", payload);

    let user;
    if (payload?.email) user = await getUserByMail(payload.email.toString());

    //We add the variable userId in the response locals
    payload["userId"] = user.id;

    next();
  } 
  catch (err: any) {
    res.send(err.message)
  }
}

export default verifyCognito;