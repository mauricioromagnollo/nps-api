import 'reflect-metadata';
import express from 'express';

import '../database';

const PORT = 3333;

const app = express();

app.get('/users', (request, response) => {
  return response.json({ message: 'Hello World - NLW04' });
});

app.post('/', (request, response) => {
  return response.json({ message: 'Os dados foram salvos com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`[*] Server running at ${PORT}`);
});
