import { Router } from 'express';

import { UserController } from '@/controllers/user';
import { SurveyController } from '@/controllers/survey';
import { SendMailController } from '@/controllers/send-mail';
import { AnswerController } from '@/controllers/answer';
import { NpsController } from '@/controllers/nps';

const routes = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

routes.post('/users', userController.create);

routes.post('/surveys', surveyController.create);
routes.get('/surveys', surveyController.show);

routes.post('/sendmail', sendMailController.execute);

routes.get('/answer/:value', answerController.execute);

routes.get('/nps/:survey_id', npsController.execute);

export { routes };
