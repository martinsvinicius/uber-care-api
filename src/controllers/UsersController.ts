import { Request, Response } from "express";
import * as Yup from 'yup';
import { getRepository } from "typeorm";

import User from "../models/User";

export default {
  async index(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return res.json(users);
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id).catch(() => {
      return res.status(404).json({ error: "Usuário não encontrado" });
    });

    return res.json(user);
  },

  async create(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      contact: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      driver: Yup.boolean().notRequired(),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const userRepository = getRepository(User);

    const user = userRepository.create(req.body);

    await userRepository.save(user);

    return res.json(user);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = getRepository(User);

    await userRepository.findOneOrFail(id).catch(() => {
      return res
        .status(400)
        .json({ error: "Ocorreu um erro ao tentar atualizar este usuário" });
    });
    await userRepository.update(id, req.body);

    const user = await userRepository.findOne(id);

    return res.json(user);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = getRepository(User);

    await userRepository.findOneOrFail(id).catch(() => {
      return res.status(404).json({ error: "Usuário não encontrado" });
    });

    await userRepository.delete(id);

    return res.json({ message: "Usuário deletado do sistema" });
  },
};
