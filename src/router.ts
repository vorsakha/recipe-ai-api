import { Router } from "express";
import UsersRouter from "@routes/users.route";
import AuthRouter from "@routes/auth.route";

const router = Router();

router.use("/users", UsersRouter);
router.use("/auth", AuthRouter);

export default router;
