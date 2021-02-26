import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';

import { SurveyRepository } from '@/repositories/survey';
import { AppError } from '@/errors/app-error';

export class SurveyController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const surveyRepository = getCustomRepository(SurveyRepository);

    const survey = surveyRepository.create({
      title,
      description,
    });

    await surveyRepository.save(survey);

    return response.status(201).json(survey);
  }

  async show(_: Request, response: Response): Promise<Response> {
    const surveyRepository = getCustomRepository(SurveyRepository);
    const allSurveys = await surveyRepository.find();
    return response.json(allSurveys);
  }
}
