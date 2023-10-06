import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { routes } from './routes/index.js';
import { env } from './utils/helper.js';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/', routes);

app.use(errorMiddleware);

app.listen(env.PORT3001, () => {
  console.log('Started ' + env.DOMAIN + ':' + env.PORT3001 + '/');
});
