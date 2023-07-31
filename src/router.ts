import { Router } from "express";
import UsersRouter from "@routes/users.route";
import AuthRouter from "@routes/auth.route";
import RecipeRouter from "./routes/recipe.route";

const router = Router();

router.use("/users", UsersRouter);
router.use("/auth", AuthRouter);
router.use("/recipe", RecipeRouter);

export default router;
