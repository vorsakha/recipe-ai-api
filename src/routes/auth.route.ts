import { Router } from "express";
import AuthController from "@controllers/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/", AuthController.auth);

export default AuthRouter;
