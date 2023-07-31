import { Request, Response } from "express";

import AppDataSource from "@database/config/datasource.config";

import User from "@models/user.entity";
import { UserRequest } from "@/types";

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

    return res.json({ user, message: "User created successfully" });
  }

  async index(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    return res.json(users);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  }

  async update(req: UserRequest, res: Response) {
    const { id } = req.params;
    const { userId } = req;
    const { email, password } = req.body;

    if (userId !== id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.email = email;
    user.password = password;

    await userRepository.save(user);

    return res.json({ user, message: "User updated successfully" });
  }

  async delete(req: UserRequest, res: Response) {
    const { id } = req.params;
    const { userId } = req;

    if (userId !== id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await userRepository.delete({ id });

    return res.json({ message: "User deleted successfully" });
  }

  async me(req: UserRequest, res: Response) {
    const { userId } = req;

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  }
}

export default new UserController();
