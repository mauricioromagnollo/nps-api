import { app } from './app';

const PORT = process.env.NPS_SERVER_PORT || 3333;

app.listen(PORT, () => {
  console.log(`[*] Server running at ${PORT}`);
});
