import { Request, Response } from "express";
import { NOT_FOUND, OK } from "http-status";

import { UserRequest, UserWithoutPassword } from "@/types";
import AppDataSource from "@database/config/datasource.config";
import Recipe from "@models/recipe.entity";
import RecipeService from "@services/recipe.service";

class RecipeController {
  async listRecipes(req: Request, res: Response) {
    const { ingredients, locale } = req.query;

    const recipes = await RecipeService.getRecipes(
      ingredients as string,
      locale as string,
    );

    return res.json({ recipes });
  }

  async store(req: UserRequest, res: Response) {
    const { title, ingredients, locale } = req.body;
    const { userId } = req;
    const recipeRepository = AppDataSource.getRepository(Recipe);

    const recipeExists = await recipeRepository.findOne({ where: { title } });
    let rules = recipeExists?.rules || [];
    let description = recipeExists?.description || "";

    if (!recipeExists) {
      const recipeDetails = await RecipeService.getRecipeDetail(
        title,
        ingredients,
        locale,
      );
      description = recipeDetails.description;
      rules = recipeDetails.rules;
    }

    const recipe = recipeRepository.create({
      title,
      description,
      rules,
      user: { id: userId },
    });

    await recipeRepository.save(recipe);

    return res.json({ recipe, message: "Recipe created successfully" });
  }

  async index(req: Request, res: Response) {
    const recipeRepository = AppDataSource.getRepository(Recipe);

    const recipes = await recipeRepository.find({ relations: ["user"] });

    const recipesObj = recipes.map((recipe) => {
      const transformedUser: UserWithoutPassword = {
        id: recipe.user.id,
        email: recipe.user.email,
        created_at: recipe.user.created_at,
      };

      return { ...recipe, user: transformedUser };
    });

    return res.json({ recipes: recipesObj });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const recipeRepository = AppDataSource.getRepository(Recipe);

    const recipe = await recipeRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    const transformedUser: UserWithoutPassword = {
      id: recipe?.user.id,
      email: recipe?.user.email,
      created_at: recipe?.user.created_at,
    };

    return res.json({ ...recipe, user: transformedUser });
  }

  async me(req: UserRequest, res: Response) {
    const { userId } = req;

    const recipeRepository = AppDataSource.getRepository(Recipe);

    const recipes = await recipeRepository.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });

    const recipesObj = recipes.map((recipe) => {
      const transformedUser: UserWithoutPassword = {
        id: recipe.user.id,
        email: recipe.user.email,
        created_at: recipe.user.created_at,
      };

      return { ...recipe, user: transformedUser };
    });

    return res.json({ recipes: recipesObj });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, rules } = req.body;

    const recipeRepository = AppDataSource.getRepository(Recipe);

    const recipe = await recipeRepository.findOne({ where: { id } });

    if (!recipe) {
      return res.status(NOT_FOUND).json({ error: "Recipe not found" });
    }

    recipe.title = title;
    recipe.description = description;
    recipe.rules = rules;

    await recipeRepository.save(recipe);

    return res.json({ message: "Recipe Updated", recipe });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const recipeRepository = AppDataSource.getRepository(Recipe);

    const recipe = await recipeRepository.findOne({ where: { id } });

    if (!recipe) {
      return res.status(NOT_FOUND).json({ error: "Recipe not found" });
    }

    await recipeRepository.remove(recipe);

    return res.status(OK).json({ message: "Recipe deleted" });
  }
}

export default new RecipeController();
