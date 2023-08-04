import { Request } from "express";

interface UserRequest extends Request {
  userId?: string;
}

interface UserWithoutPassword {
  id?: string;
  email?: string;
  created_at?: Date;
}
