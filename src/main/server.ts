import 'reflect-metadata';
import express from 'express';

import '../database';

import { userRoutes } from '../routes/user';

const PORT = 3333;

const app = express();

app.use(express.json());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`[*] Server running at ${PORT}`);
});
