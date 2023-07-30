import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "@constants/envs";

import AppDataSource from "@database/config/datasource.config";

import User from "@models/user.entity";

class AuthController {
  async auth(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401).json({ error: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, config.AUTH_JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
      },
      token,
    });
  }
}

export default new AuthController();
