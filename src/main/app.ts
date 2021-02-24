import 'reflect-metadata';
import 'module-alias/register';
import express from 'express';

import createConnection from '@/database';

import { userRoutes } from '@/routes/user';

createConnection();
const app = express();

app.use(express.json());
app.use(userRoutes);

export { app };
