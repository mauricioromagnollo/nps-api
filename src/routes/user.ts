import { Router } from 'express';
import { UserController } from '@/controllers/user';
import { SurveyController } from '@/controllers/survey';

const userRoutes = Router();

const userController = new UserController();
const surveyController = new SurveyController();

userRoutes.post('/users', userController.create);
userRoutes.post('/surveys', surveyController.create);
userRoutes.get('/surveys', surveyController.show);

export { userRoutes };
