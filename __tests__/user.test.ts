import request from 'supertest';
import fs from 'fs';
import path from 'path';

import { app } from '../src/main/app';

import createConnection from '../src/database';

describe('Users', () => {
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

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      email: 'johndoe@example.com',
      name: 'John Doe',
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new user with existent email', async () => {
    const response = await request(app).post('/users').send({
      email: 'johndoe@example.com',
      name: 'John Doe',
    });

    expect(response.status).toBe(400);
  });
});
