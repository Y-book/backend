import express, { Response, Request, NextFunction } from "express"

import createError from "http-errors"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan";

//Routers
import UserRouter from "./routes/user-routes"
import PostRouter from "./routes/post-routes"
import PostLikeRouter from "./routes/postLike-routes"
import CommentRouter from "./routes/comment-routes";

import cors from "cors"

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.use("/users", UserRouter)
app.use("/posts", PostRouter)
app.use("/likes", PostLikeRouter)
app.use("/comments", CommentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  console.log(err.message)
  res.locals.message = err.message;

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message })
});

export default app
