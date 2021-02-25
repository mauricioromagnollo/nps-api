import 'reflect-metadata';
import 'module-alias/register';
import express from 'express';

import createConnection from '@/database';

import { routes } from '@/routes';

createConnection();
const app = express();

app.use(express.json());
app.use(routes);

export { app };
