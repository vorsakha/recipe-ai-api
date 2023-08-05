import express from "express";
import request from "supertest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "@/database/config/datasource.config";
import { NOT_FOUND, OK, UNAUTHORIZED } from "http-status";
import AuthRouter from "@routes/auth.route";

jest.mock("@database/config/datasource.config", () => ({
  getRepository: jest.fn(),
}));

const mockUser = {
  id: "user-id",
  email: "test@example.com",
  password: "$2a$10$Z3J5Y2h0YXNwYXNz",
  created_at: new Date(),
};

describe("AuthRoutes", () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/auth", AuthRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a valid token and user object when credentials are correct", async () => {
    const mockUserRepository = {
      findOne: jest.fn().mockResolvedValue(mockUser),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(
      mockUserRepository,
    );

    const bcryptCompare = jest.fn().mockResolvedValueOnce(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    const jwtSign = jest.fn().mockReturnValue("dummy-token");
    (jwt.sign as jest.Mock) = jwtSign;

    const response = await request(app).post("/auth").send({
      email: "test@example.com",
      password: "valid-password",
    });

    expect(response.status).toBe(OK);
    expect(response.body).toHaveProperty("token", "dummy-token");
    expect(response.body.user).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      created_at: mockUser.created_at.toISOString(),
    });
  });

  it("should return 404 when user is not found", async () => {
    const mockUserRepository = {
      findOne: jest.fn().mockResolvedValue(null),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(
      mockUserRepository,
    );

    const response = await request(app).post("/auth").send({
      email: "nonexistent@example.com",
      password: "some-password",
    });

    expect(response.status).toBe(NOT_FOUND);
    expect(response.body).toHaveProperty("error", "User not found");
  });

  it("should return 401 when password is invalid", async () => {
    const mockUserRepository = {
      findOne: jest.fn().mockResolvedValue(mockUser),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(
      mockUserRepository,
    );

    const bcryptCompare = jest.fn().mockResolvedValueOnce(false);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    const response = await request(app).post("/auth").send({
      email: "test@example.com",
      password: "invalid-password",
    });

    expect(response.status).toBe(UNAUTHORIZED);
    expect(response.body).toHaveProperty("error", "Invalid password");
  });
});
