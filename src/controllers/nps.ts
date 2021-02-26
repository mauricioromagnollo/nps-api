import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SurveyUserRepository } from '@/repositories/survey-user';

export class NpsController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { survey_id } = request.params;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.find({
      survey_id,
    });

    const detractor = surveyUser.filter(
      (survey) => survey.value >= 0 && survey.value <= 6,
    ).length;

    const promoters = surveyUser.filter(
      (survey) => survey.value >= 9 && survey.value <= 10,
    ).length;

    const passive = surveyUser.filter(
      (survey) => survey.value >= 7 && survey.value <= 8,
    ).length;

    const totalAnswers = surveyUser.length;

    const calculate = (promoters - detractor) / totalAnswers;

    return response.json({
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps: calculate,
    });
  }
}
