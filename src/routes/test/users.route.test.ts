import request from "supertest";
import express from "express";
import UsersRouter from "@routes/users.route";
import { CONFLICT, OK } from "http-status";
import AppDataSource from "@/database/config/datasource.config";

jest.mock("@database/config/datasource.config", () => ({
  getRepository: jest.fn(),
}));

const userResponse = {
  user: {
    id: "123",
    email: "test@example.com",
    created_at: "2021-01-01T00:00:00.000Z",
  },
  message: "User created successfully",
};
const mockUserRepository = {
  findOne: jest.fn().mockResolvedValue(null),
  create: jest.fn().mockReturnValue(userResponse.user),
  save: jest.fn(),
};

describe("UsersRoutes", () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/users", UsersRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /users", () => {
    it("should return a 200 status, success message and the user object", async () => {
      (AppDataSource.getRepository as jest.Mock).mockReturnValue(
        mockUserRepository,
      );

      const response = await request(app).post("/users").send({
        email: "test@example.com",
        password: "valid-password",
      });
      expect(response.status).toBe(OK);
      expect(response.body).toHaveProperty("message", userResponse.message);
      expect(response.body).toHaveProperty("user");
      expect(response.body.user).toEqual(userResponse.user);
    });

    it("should return a 409 status and error messages when trying to create an account with existing user email", async () => {
      const mockUser = {
        id: "user-id",
        email: "test@example.com",
        password: "$2a$10$Z3J5Y2h0YXNwYXNz",
        created_at: new Date(),
      };
      const repository = {
        ...mockUserRepository,
        findOne: jest.fn().mockResolvedValue(mockUser),
      };

      (AppDataSource.getRepository as jest.Mock).mockReturnValue(repository);

      const response = await request(app).post("/users").send({
        email: "test@example.com",
        password: "valid-password",
      });

      expect(response.status).toBe(CONFLICT);
      expect(response.body).toHaveProperty("error", "User already exists");
    });
  });
});
