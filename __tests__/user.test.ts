import request from 'supertest';
import { getConnection } from 'typeorm';

// import { AppError } from '../src/errors/app-error';

import { app } from '../src/main/app';

import createConnection from '../src/database';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
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

  it('should not be able to create a new user with invalid email', async () => {
    const response = await request(app).post('/users').send({
      email: 'invalid_email',
      name: 'John Doe',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new user with empty name', async () => {
    const response = await request(app).post('/users').send({
      email: 'johndoe@example.com',
      name: '',
    });

    expect(response.status).toBe(400);
  });
});
