import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "@constants/envs";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    jwt.verify(token, config.AUTH_JWT_SECRET);
    return next();
  } catch {
    return res.sendStatus(401).send({ error: "Invalid token" });
  }
}
