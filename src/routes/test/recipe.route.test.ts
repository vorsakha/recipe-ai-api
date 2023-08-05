import request from "supertest";
import express from "express";
import { NOT_FOUND, OK, UNPROCESSABLE_ENTITY } from "http-status";
import AppDataSource from "@/database/config/datasource.config";
import RecipeRouter from "@routes/recipe.route";
import createMockToken from "@utils/mockToken";
import recipeService from "@/services/recipe.service";

const mockRecipeDetail = {
  description: "Recipe description",
  rules: ["rule 1", "rule 2"],
};
const recipeResponse = {
  recipe: {
    id: "ab32e631-208d-4d8e-bbee-d7577b2c1b34",
    title: "Recipe title",
    description: "Recipe description",
    created_at: "2021-01-01T00:00:00.000Z",
  },
  message: "Recipe created successfully",
};
const recipeFound = {
  id: "ab32e631-208d-4d8e-bbee-d7577b2c1b34",
  title: "Recipe title",
  description: "Recipe description",
  rules: ["rule 1", "rule 2"],
};

jest.mock("@database/config/datasource.config", () => ({
  getRepository: jest.fn(),
}));
jest.mock("@services/recipe.service", () => ({
  getRecipeDetail: jest.fn().mockResolvedValue({
    description: "Recipe description",
    rules: ["rule 1", "rule 2"],
  }),
}));

const mockRecipeRepository = {
  findOne: jest.fn().mockResolvedValue(mockRecipeDetail),
  create: jest.fn().mockReturnValue(recipeResponse.recipe),
  save: jest.fn(),
  remove: jest.fn(),
};

describe("RecipeRoutes", () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/recipe", RecipeRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /recipe", () => {
    it("should return a 200 status and the recipe object", async () => {
      (AppDataSource.getRepository as jest.Mock).mockReturnValue(
        mockRecipeRepository,
      );

      const response = await request(app)
        .post("/recipe")
        .set(
          "Authorization",
          `Bearer ${createMockToken({ sub: { userId: "123" } })}`,
        )
        .send({
          title: "Recipe title",
          ingredients: "Recipe ingredients",
        });

      expect(response.status).toBe(OK);
      expect(response.body).toHaveProperty("message", recipeResponse.message);
      expect(response.body).toHaveProperty("recipe");
      expect(response.body.recipe).toEqual(recipeResponse.recipe);
    });

    it("should get recipe detail if it does not exist", async () => {
      const repository = {
        ...mockRecipeRepository,
        findOne: jest.fn().mockResolvedValue(null),
      };

      (AppDataSource.getRepository as jest.Mock).mockReturnValue(repository);
      const getRecipeDetail = jest
        .spyOn(recipeService, "getRecipeDetail")
        .mockImplementation(() => Promise.resolve(mockRecipeDetail));

      const response = await request(app)
        .post("/recipe")
        .set(
          "Authorization",
          `Bearer ${createMockToken({ sub: { userId: "123" } })}`,
        )
        .send({
          title: "Recipe title",
          ingredients: "Recipe ingredients",
          locale: "en-us",
        });

      expect(getRecipeDetail).toHaveBeenCalledTimes(1);
      expect(getRecipeDetail).toHaveBeenCalledWith(
        "Recipe title",
        "Recipe ingredients",
        "en-us",
      );
      expect(response.status).toBe(OK);
      expect(response.body).toHaveProperty("message", recipeResponse.message);
      expect(response.body).toHaveProperty("recipe");
      expect(response.body.recipe).toEqual(recipeResponse.recipe);
    });

    it("should return a 404 status and error messages when trying to create an recipe with invalid body", async () => {
      (AppDataSource.getRepository as jest.Mock).mockReturnValue(
        mockRecipeRepository,
      );

      const response = await request(app)
        .post("/recipe")
        .set(
          "Authorization",
          `Bearer ${createMockToken({ sub: { userId: "123" } })}`,
        )
        .send({});

      expect(response.status).toBe(UNPROCESSABLE_ENTITY);
    });
  });

  describe("PATCH /recipe", () => {
    it("should return a 200 status and the recipe object", async () => {
      const repository = {
        ...mockRecipeRepository,
        findOne: jest.fn().mockResolvedValue(recipeFound),
      };

      (AppDataSource.getRepository as jest.Mock).mockReturnValue(repository);

      const response = await request(app)
        .patch("/recipe/ab32e631-208d-4d8e-bbee-d7577b2c1b34")
        .set(
          "Authorization",
          `Bearer ${createMockToken({ sub: { userId: "123" } })}`,
        )
        .send({
          title: "Recipe title updated",
          description: "Recipe description updated",
          rules: ["rule 1", "rule 2", "rule 3"],
        });

      expect(response.status).toBe(OK);
      expect(response.body).toHaveProperty("message", "Recipe Updated");
      expect(response.body).toHaveProperty("recipe");
      expect(response.body.recipe).toEqual({
        id: "ab32e631-208d-4d8e-bbee-d7577b2c1b34",
        title: "Recipe title updated",
        description: "Recipe description updated",
        rules: ["rule 1", "rule 2", "rule 3"],
      });
    });

    it("should return a 404 error when trying to patch a non-existent recipe", async () => {
      const repository = {
        ...mockRecipeRepository,
        findOne: jest.fn().mockResolvedValue(null),
      };

      (AppDataSource.getRepository as jest.Mock).mockReturnValue(repository);

      const response = await request(app)
        .patch("/recipe/ab32e631-208d-4d8e-bbee-d7577b2c1b34")
        .set(
          "Authorization",
          `Bearer ${createMockToken({ sub: { userId: "123" } })}`,
        )
        .send({
          title: "Recipe title updated",
          description: "Recipe description updated",
          rules: ["rule 1", "rule 2", "rule 3"],
        });

      expect(response.status).toBe(NOT_FOUND);
      expect(response.body).toHaveProperty("error", "Recipe not found");
    });

    it("should return a 404 status and error messages when trying to update an recipe with invalid body", async () => {
      (AppDataSource.getRepository as jest.Mock).mockReturnValue(
        mockRecipeRepository,
      );

      const response = await request(app)
        .patch("/recipe/ab32e631-208d-4d8e-bbee-d7577b2c1b34")
        .set(
          "Authorization",
          `Bearer ${createMockToken({ sub: { userId: "123" } })}`,
        )
        .send({});

      expect(response.status).toBe(UNPROCESSABLE_ENTITY);
    });
  });

  describe("DELETE /recipe", () => {
    it("should return a 200 status and the success message", async () => {
      const repository = {
        ...mockRecipeRepository,
        findOne: jest.fn().mockResolvedValue(recipeFound),
      };

      (AppDataSource.getRepository as jest.Mock).mockReturnValue(repository);

      const response = await request(app)
        .delete("/recipe/ab32e631-208d-4d8e-bbee-d7577b2c1b34")
        .set(
          "Authorization",
          `Bearer ${createMockToken({ sub: { userId: "123" } })}`,
        );

      expect(response.status).toBe(OK);
      expect(response.body).toHaveProperty("message", "Recipe deleted");
    });

    it("should return a 404 error when trying to delete a non-existent recipe", async () => {
      const repository = {
        ...mockRecipeRepository,
        findOne: jest.fn().mockResolvedValue(null),
      };

      (AppDataSource.getRepository as jest.Mock).mockReturnValue(repository);

      const response = await request(app)
        .delete("/recipe/ab32e631-208d-4d8e-bbee-d7577b2c1b34")
        .set(
          "Authorization",
          `Bearer ${createMockToken({ sub: { userId: "123" } })}`,
        );

      expect(response.status).toBe(NOT_FOUND);
      expect(response.body).toHaveProperty("error", "Recipe not found");
    });
  });
});
