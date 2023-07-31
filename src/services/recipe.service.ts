import { Configuration, OpenAIApi } from "openai";

import env from "@constants/envs";

export type RecipeList = string[];

export interface RecipeDetail {
  description: string;
  rules: RecipeList;
}

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class RecipeService {
  async getRecipes(ingredients: string, locale = "pt-br"): Promise<RecipeList> {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `In ${locale}, Give me 5 different recipe names, in an js array of strings, with the given ingredients: ${ingredients}.`,
        },
      ],
    });

    const rawRecipes = (completion.data.choices[0].message?.content || "")
      .replace(/\n/g, "")
      .replace(/\\"/g, '"');

    const recipes = JSON.parse(rawRecipes);

    return recipes;
  }

  async getRecipeDetail(
    recipe: string,
    ingredients: string,
    locale = "pt-br",
  ): Promise<RecipeDetail> {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: `In ${locale}, give me an js array, the first index will be an extended description of this recipe: ${recipe}, the rest will be a detailed unnumbered list of actions on how to make the recipe. Remember to keep the ingredients within this list: ${ingredients}.`,
        },
      ],
    });

    const rawRecipeDetails = (completion.data.choices[0].message?.content || "")
      .replace(/\n/g, "")
      .replace(/\\"/g, '"');

    const recipeDetails = JSON.parse(rawRecipeDetails);

    const [description, ...rules] = recipeDetails;

    return { description, rules };
  }
}

export default new RecipeService();
