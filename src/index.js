import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { routes } from './routes/index.js';
import { env } from './utils/helper.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

//error middleware
app.use((err, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(env.PORT3001, () => {
  console.log('Started ' + env.DOMAIN + ':' + env.PORT3001 + '/');
});
