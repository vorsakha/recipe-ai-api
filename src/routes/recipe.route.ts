import { Router } from "express";

import AuthMiddleware from "@middlewares/auth.middleware";
import RecipeController from "@controllers/recipe.controller";

const RecipeRouter = Router();

RecipeRouter.get("/", AuthMiddleware, RecipeController.index);
RecipeRouter.get("/list", AuthMiddleware, RecipeController.listRecipes);
RecipeRouter.get("/me", AuthMiddleware, RecipeController.me);
RecipeRouter.get("/:id", AuthMiddleware, RecipeController.show);
RecipeRouter.post("/", AuthMiddleware, RecipeController.store);
RecipeRouter.patch("/:id", AuthMiddleware, RecipeController.update);
RecipeRouter.delete("/:id", AuthMiddleware, RecipeController.delete);

export default RecipeRouter;
