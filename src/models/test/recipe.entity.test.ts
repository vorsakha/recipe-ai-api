import Recipe from "@models/recipe.entity";
import User from "@models/user.entity";

describe("Recipe entity", () => {
  it("should create a new recipe", () => {
    const user = new User();
    user.id = "123";
    user.email = "test@example.com";
    user.password = "password";
    user.created_at = new Date();

    const recipe = new Recipe();
    recipe.id = "456";
    recipe.user = user;
    recipe.title = "Test Recipe";
    recipe.description = "This is a test recipe";
    recipe.rules = ["rule 1", "rule 2"];

    expect(recipe.id).toBe("456");
    expect(recipe.user).toBe(user);
    expect(recipe.title).toBe("Test Recipe");
    expect(recipe.description).toBe("This is a test recipe");
    expect(recipe.rules).toEqual(["rule 1", "rule 2"]);
  });
});
