import { Router } from "express";
import AuthController from "@controllers/auth.controller";
import { authPostValidator } from "@/validators/auth.validator";

const AuthRouter = Router();

AuthRouter.post("/", authPostValidator, AuthController.auth);

export default AuthRouter;
