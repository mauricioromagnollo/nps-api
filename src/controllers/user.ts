import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';

import { UserRepository } from '@/repositories/user';

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err });
    }

    const usersRepository = getCustomRepository(UserRepository);

    const hasUserWithThisEmail = await usersRepository.findOne({
      email,
    });

    if (hasUserWithThisEmail) {
      return response.status(400).json({
        error: 'User already exists!',
      });
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}
