import jwt from "jsonwebtoken";
import env from "@constants/envs";

export default function createMockToken(payload: object): string {
  return jwt.sign(payload, env.AUTH_JWT_SECRET, { expiresIn: "1h" });
}
