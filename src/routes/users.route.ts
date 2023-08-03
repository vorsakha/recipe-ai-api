import { Router } from "express";
import UserController from "@controllers/user.controller";
import { userPostValidator } from "@validators/user.validator";

const UsersRouter = Router();

UsersRouter.post("/", userPostValidator, UserController.store);

export default UsersRouter;
