import { Request } from "express";

interface UserRequest extends Request {
  userId?: string;
}
