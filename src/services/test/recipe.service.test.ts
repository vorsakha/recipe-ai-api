import RecipeService, {
  RecipeDetail,
  RecipeList,
} from "@services/recipe.service";

jest.mock("openai", () => ({
  Configuration: jest.fn(),
  OpenAIApi: jest.fn(() => ({
    createChatCompletion: jest.fn(async () => ({
      data: {
        choices: [
          {
            message: {
              content: JSON.stringify(["Recipe 1", "Recipe 2", "Recipe 3"]),
            },
          },
        ],
      },
    })),
  })),
}));

describe("Recipe Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should getRecipes", async () => {
    const ingredients = "tomato, onion, garlic";
    const locale = "en-us";

    const recipes: RecipeList = await RecipeService.getRecipes(
      ingredients,
      locale,
    );

    expect(recipes).toEqual(["Recipe 1", "Recipe 2", "Recipe 3"]);
  });

  it("should getRecipeDetail", async () => {
    const recipe = "Carbonara";
    const ingredients = "pasta, eggs, bacon";

    const recipeDetail: RecipeDetail = await RecipeService.getRecipeDetail(
      recipe,
      ingredients,
    );

    expect(recipeDetail).toEqual({
      description: "Recipe 1",
      rules: ["Recipe 2", "Recipe 3"],
    });
  });
});
