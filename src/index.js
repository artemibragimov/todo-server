import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { env } from './utils/helper.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errorMiddleware.js';
import rra from 'recursive-readdir-async';
import readDirPatch from './utils/readDirPatch.js';

const app = express();
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(env.UPLOAD_MULTER));

(await rra.list('./src/routes')).forEach(async (file) => {
  const { path, dir } = await readDirPatch(file);
  app.use(path, (await import(dir)).default);
  app.use(errorMiddleware);
});

app.listen(env.PORT3001, () => {
  console.log('Started ' + env.DOMAIN + ':' + env.PORT3001 + '/');
});
