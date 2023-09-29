import "dotenv/config";
import express from "express";
import { TaskController, UserController } from "./controllers/index.js";
import cors from "cors";
import {
  loginValidations,
  registerValidations,
} from "./validations/validations.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import checkAuth from "./utils/checkAuth.js";
import multer from "multer";

const app = express();
const port = process.env.PORT3001;
const domain = process.env.DOMAIN;
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("C:\\CODE\\todo-server\\src\\uploads"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:\\CODE\\todo-server\\src\\uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post(
  "/signup",
  registerValidations,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/login",
  loginValidations,
  handleValidationErrors,
  UserController.login
);

app.get("/me", checkAuth, UserController.me);
app.post("/me", checkAuth, UserController.updateMe);

app.post(
  "/uploads",
  checkAuth,
  upload.single("image"),
  UserController.uploadAvatar
);

app.get("/", checkAuth, TaskController.getAllTasks);
app.post("/", checkAuth, TaskController.createTask);
app.delete("/", checkAuth, TaskController.deleteTask);
app.put("/", checkAuth, TaskController.updateTask);

app.listen(port, () => {
  console.log("Server started on " + domain + ":" + port);
});
