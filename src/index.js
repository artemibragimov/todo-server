import "dotenv/config";
import express from "express";
import cors from "cors";
import { routes } from "./routes/routes.js";

const app = express();
const port = process.env.PORT3001;
const domain = process.env.DOMAIN;
app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log("Server started on " + domain + ":" + port);
});
