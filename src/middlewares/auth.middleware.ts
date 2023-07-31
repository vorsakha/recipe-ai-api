import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "@constants/envs";
import { UserRequest } from "@/types";

export default async function authMiddleware(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = jwt.verify(token, config.AUTH_JWT_SECRET) as {
      id: string;
    };

    req.userId = decodedToken.id;
    return next();
  } catch {
    return res.sendStatus(401).send({ error: "Invalid token" });
  }
}
