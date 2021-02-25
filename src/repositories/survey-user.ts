import { EntityRepository, Repository } from 'typeorm';
import { SurveyUser } from '@/models/survey-user';

@EntityRepository(SurveyUser)
export class SurveyUserRepository extends Repository<SurveyUser> {}
