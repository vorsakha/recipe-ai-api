import env from "@constants/envs";
import userSchema from "@schemas/user.schema";
import authSchemas from "@schemas/auth.schema";
import recipeSchema from "@schemas/recipe.schema";

export default {
  openapi: "3.0.0",
  info: {
    version: "0.0.1",
    title: "RecipeAI API",
  },
  servers: [
    {
      url: env.APP_URL,
      description: "Server",
    },
  ],
  components: {
    securitySchemes: {
      Token: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      Token: [],
    },
  ],
  paths: {
    ...authSchemas,
    ...userSchema,
    ...recipeSchema,
  },
};
