import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SurveyRepository } from '@/repositories/survey';

export class SurveyController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

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
