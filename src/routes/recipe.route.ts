import { Router } from "express";

import AuthMiddleware from "@middlewares/auth.middleware";
import RecipeController from "@controllers/recipe.controller";
import {
  recipeDeleteValidator,
  recipeShowValidator,
  recipeStoreValidator,
  recipeUpdateValidator,
} from "@validators/recipe.validator";

const RecipeRouter = Router();

RecipeRouter.get("/", AuthMiddleware, RecipeController.index);
RecipeRouter.get("/list", AuthMiddleware, RecipeController.listRecipes);
RecipeRouter.get("/me", AuthMiddleware, RecipeController.me);
RecipeRouter.get(
  "/:id",
  AuthMiddleware,
  recipeShowValidator,
  RecipeController.show,
);
RecipeRouter.post(
  "/",
  AuthMiddleware,
  recipeStoreValidator,
  RecipeController.store,
);
RecipeRouter.patch(
  "/:id",
  AuthMiddleware,
  recipeUpdateValidator,
  RecipeController.update,
);
RecipeRouter.delete(
  "/:id",
  AuthMiddleware,
  recipeDeleteValidator,
  RecipeController.delete,
);

export default RecipeRouter;
