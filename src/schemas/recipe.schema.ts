import {
  InternalServerError,
  UnprocessableEntity,
} from "@schemas/error-response.schema";
import { userSchema } from "@schemas/user.schema";

const recipeSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      example: "ab32e631-208d-4d8e-bbee-d7577b2c1b34",
    },
    title: {
      type: "string",
      example: "Bolo de cenoura",
    },
    description: {
      type: "string",
      example: "Bolo de cenoura com cobertura de chocolate",
    },
    rules: {
      type: "array",
      items: {
        type: "string",
        example: "Bata as claras em neve...",
      },
    },
  },
};

const createRecipe = {
  tags: ["Recipe"],
  description: "Create a recipe",
  responses: {
    "200": {
      description: "Recipe created.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              recipe: {
                ...recipeSchema,
                properties: {
                  ...recipeSchema.properties,
                  user: { ...userSchema },
                },
              },
              message: {
                type: "string",
                example: "Recipe created successfully",
              },
            },
          },
        },
      },
    },
    ...UnprocessableEntity,
    ...InternalServerError,
  },
  requestBody: {
    description: "Object needed to create a recipe",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Bolo de cenoura",
            },
            ingredients: {
              type: "string",
              example: "Cenoura, farinha, ovos, leite, chocolate",
            },
            locale: {
              type: "string",
              example: "pt-BR",
            },
          },
        },
      },
    },
    required: true,
  },
};

const getRecipes = {
  tags: ["Recipe"],
  description: "Get recipes",
  responses: {
    "200": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              recipes: {
                type: "array",
                items: {
                  ...recipeSchema,
                  properties: {
                    ...recipeSchema.properties,
                    user: { ...userSchema },
                  },
                },
              },
            },
          },
        },
      },
    },
    ...UnprocessableEntity,
    ...InternalServerError,
  },
};

const getMyRecipes = {
  ...getRecipes,
  description: "Get recipes from logged user",
};

const getRecipesList = {
  tags: ["Recipe"],
  description: "Get recipes",
  parameters: [
    {
      name: "ingredients",
      in: "query",
      description: "list of ingredients available",
      required: true,
      schema: {
        type: "string",
        example: "carrot, flour, eggs, milk, chocolate",
      },
    },
  ],
  responses: {
    "200": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              recipes: {
                type: "array",
                items: {
                  type: "string",
                  example: "Bolo de cenoura...",
                },
              },
            },
          },
        },
      },
    },
    ...UnprocessableEntity,
    ...InternalServerError,
  },
};

const getRecipeById = {
  tags: ["Recipe"],
  description: "Get recipe by ID",
  parameters: [
    {
      name: "id",
      in: "query",
      description: "id of the recipe",
      required: true,
      schema: {
        type: "uuid",
        example: "b0d7d7e0-5b1a-4b0e-8b0a-0e8b0a0e8b0a",
      },
    },
  ],
  responses: {
    "200": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              recipe: {
                ...recipeSchema,
                properties: {
                  ...recipeSchema.properties,
                  user: { ...userSchema },
                },
              },
            },
          },
        },
      },
    },
    ...UnprocessableEntity,
    ...InternalServerError,
  },
};

const updateRecipe = {
  tags: ["Recipe"],
  description: "Update recipe",
  parameters: [
    {
      name: "id",
      in: "query",
      description: "id of the recipe",
      required: true,
      schema: {
        type: "uuid",
        example: "b0d7d7e0-5b1a-4b0e-8b0a-0e8b0a0e8b0a",
      },
    },
  ],
  responses: {
    "200": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              recipe: {
                ...recipeSchema,
                properties: {
                  ...recipeSchema.properties,
                  user: { ...userSchema },
                },
              },
              message: {
                type: "string",
                example: "Recipe Updated",
              },
            },
          },
        },
      },
    },
    ...UnprocessableEntity,
    ...InternalServerError,
  },
  requestBody: {
    description: "Object needed to create a recipe",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Bolo de cenoura",
            },
            description: {
              type: "string",
              example: "Bolo de cenoura com cobertura de chocolate",
            },
            rules: {
              type: "array",
              items: {
                type: "string",
                example: "Bata os ovos...",
              },
            },
          },
        },
      },
    },
    required: true,
  },
};

const deleteRecipe = {
  tags: ["Recipe"],
  description: "Delete recipe by ID",
  parameters: [
    {
      name: "id",
      in: "query",
      description: "id of the recipe",
      required: true,
      schema: {
        type: "uuid",
        example: "b0d7d7e0-5b1a-4b0e-8b0a-0e8b0a0e8b0a",
      },
    },
  ],
  responses: {
    "200": {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Recipe Deleted",
              },
            },
          },
        },
      },
    },
    ...UnprocessableEntity,
    ...InternalServerError,
  },
};

export default {
  "/recipe": {
    get: getRecipes,
    post: createRecipe,
  },
  "/recipe/list": {
    get: getRecipesList,
  },
  "/recipe/me": {
    get: getMyRecipes,
  },
  "/recipe/{id}": {
    get: getRecipeById,
    patch: updateRecipe,
    delete: deleteRecipe,
  },
};
