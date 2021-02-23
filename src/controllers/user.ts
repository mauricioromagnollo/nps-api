import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../models/user';

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const usersRepository = getRepository(User);

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

    return response.json(user);
  }
}
