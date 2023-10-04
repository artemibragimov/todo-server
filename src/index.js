import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { routes } from './routes/routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

app.listen(process.env.PORT3001, () => {
  console.log(
    'Started ' + process.env.DOMAIN + ':' + process.env.PORT3001 + '/'
  );
});
