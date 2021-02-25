import { Router } from 'express';
import { UserController } from '@/controllers/user';
import { SurveyController } from '@/controllers/survey';
import { SendMailController } from '@/controllers/send-mail';

const routes = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

routes.post('/users', userController.create);

routes.post('/surveys', surveyController.create);
routes.get('/surveys', surveyController.show);

routes.post('/sendmail', sendMailController.execute);

export { routes };
