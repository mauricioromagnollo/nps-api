import request from 'supertest';
import fs from 'fs';
import path from 'path';

import { app } from '../src/main/app';

import createConnection from '../src/database';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(() => {
    const databaseTestFilePath = path.join(
      __dirname,
      '..',
      'src',
      'database',
      'database.test.sqlite',
    );
    try {
      fs.unlinkSync(databaseTestFilePath);
    } catch (err) {
      console.error(err);
    }
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
});
