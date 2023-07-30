import { Router } from "express";
import UserController from "@controllers/user.controller";
import AuthMiddleware from "@middlewares/auth.middleware";

const UsersRouter = Router();

UsersRouter.post("/", UserController.store);
UsersRouter.get("/", AuthMiddleware, UserController.index);

export default UsersRouter;
