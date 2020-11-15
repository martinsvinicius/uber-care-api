import { Request, Response } from "express";
import * as Yup from 'yup';
import { getRepository } from "typeorm";
import Hospital from "../models/Hospital";

export default {
  async index(req: Request, res: Response) {
    const hospitalRepository = getRepository(Hospital);

    const hospitals = await hospitalRepository.find();

    return res.json(hospitals);
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const hospitalRepository = getRepository(Hospital);

    const hospital = await hospitalRepository.findOneOrFail(id).catch(() => {
      return res.status(404).json({ error: "Hospital não encontrado" });
    });

    return res.json(hospital);
  },

  async create(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      owner_name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      contact: Yup.string().required(),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const { name, owner_name, latitude, longitude, contact } = req.body;

    const hospitalRepository = getRepository(Hospital);

    const hospital = hospitalRepository.create({
      name,
      owner_name,
      latitude,
      longitude,
      contact,
    });

    await hospitalRepository.save(hospital);

    return res.json(hospital);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const hospitalRepository = getRepository(Hospital);

    await hospitalRepository.findOneOrFail(id).catch(() => {
      return res.status(404).json({ error: "Hospital não encontrado" });
    });

    await hospitalRepository.delete(id);

    return res.json({ message: "Hospital deletado do sistema" });
  },
};
