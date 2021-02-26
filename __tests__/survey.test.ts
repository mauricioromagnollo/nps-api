import request from 'supertest';
import { getConnection } from 'typeorm';

import { app } from '../src/main/app';

import createConnection from '../src/database';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new survey', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'Title Example',
      description: 'Description Example',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to get all surveys', async () => {
    await request(app).post('/surveys').send({
      title: 'Title Example',
      description: 'Description Example',
    });

    const response = await request(app).get('/surveys');

    expect(response.body.length).toBe(2);
  });

  it('should not be able to create new survey without title and description', async () => {
    const response = await request(app).post('/surveys').send({
      title: '',
      description: '',
    });

    expect(response.status).toBe(400);
  });
});
