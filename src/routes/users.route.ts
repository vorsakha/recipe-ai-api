import { Router } from "express";
import UserController from "@controllers/user.controller";
import AuthMiddleware from "@middlewares/auth.middleware";
import { userPostValidator } from "@validators/user.validator";

const UsersRouter = Router();

UsersRouter.post("/", userPostValidator, UserController.store);
UsersRouter.get("/", AuthMiddleware, UserController.index);

export default UsersRouter;
