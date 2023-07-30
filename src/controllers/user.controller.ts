import { Request, Response } from "express";

import AppDataSource from "@database/config/datasource.config";

import User from "@models/user.entity";

class UserController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user = userRepository.create({ email, password });

    await userRepository.save(user);

    return res.json(user);
  }

  async index(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    return res.json(users);
  }
}

export default new UserController();
