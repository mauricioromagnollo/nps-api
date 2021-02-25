import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SurveyRepository } from '@/repositories/survey';
import { SurveyUserRepository } from '@/repositories/survey-user';
import { UserRepository } from '@/repositories/user';

export class SendMailController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { email, survey_id } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const hasUserWithThisEmail = await userRepository.findOne({ email });

    if (!hasUserWithThisEmail) {
      return response.status(400).json({
        error: 'User does not exist!',
      });
    }

    const isSurveyAlreadyExists = await surveyRepository.findOne({
      id: survey_id,
    });

    if (!isSurveyAlreadyExists) {
      return response.status(400).json({
        error: 'Survey does not exist!',
      });
    }

    const surveyUser = surveyUserRepository.create({
      user_id: isSurveyAlreadyExists.id,
      survey_id,
    });

    await surveyUserRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}
