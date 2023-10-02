import express, { Router } from "express";
import checkAuth from "../utils/checkAuth.js";
import {
  loginValidations,
  registerValidations,
} from "../validations/validations.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import { UserController } from "../controllers/index.js";
import multer from "multer";

export const userRoutes = Router();

userRoutes.use(
  "/uploads",
  express.static("C:\\CODE\\todo-server\\src\\uploads")
);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:\\CODE\\todo-server\\src\\uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

userRoutes.post(
  "/uploads",
  checkAuth,
  upload.single("image"),
  UserController.uploadAvatar
);

userRoutes.post(
  "/signup",
  registerValidations,
  handleValidationErrors,
  UserController.register
);
userRoutes.post(
  "/login",
  loginValidations,
  handleValidationErrors,
  UserController.login
);

userRoutes.get("/me", checkAuth, UserController.me);
userRoutes.post("/me", checkAuth, UserController.updateMe);
