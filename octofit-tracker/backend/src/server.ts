import express from 'express';
import './config/database.js';
import apiRouter from './routes/api.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
});