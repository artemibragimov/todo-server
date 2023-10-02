import { UserModel } from "../../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const user = await UserModel.create({
      login: req.body.login,
      email: req.body.email,
      password: passwordHash,
    });

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({
      message: "A user with this login or email already exists",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      where: {
        login: req.body.login,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPass) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({
      message: "Invalid email or password",
    });
  }
};

export const me = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      where: {
        id: req.id,
      },
    });

    const { login, email, createdAt, imageUrl, ...userData } = user;

    res.json({
      login: login,
      email: email,
      imageUrl: imageUrl,
      createdAt: createdAt,
    });
  } catch (err) {
    return res.status(404).json({
      message: "user not found",
    });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    await UserModel.update(
      {
        imageUrl:
          process.env.DOMAIN +
          ":" +
          process.env.PORT3001 +
          "/auth/uploads/" +
          req.file.originalname,
      },
      {
        where: {
          id: req.id,
        },
      }
    );

    res.json("success");
  } catch (err) {
    return res.status(404).json({
      message: "user not found",
    });
  }
};

export const updateMe = async (req, res) => {
  try {
    switch (req.body.updateType) {
      case "updateLogin":
        await UserModel.update(
          {
            login: req.body.text,
          },
          {
            where: {
              id: req.id,
            },
          }
        );
        break;
      case "updateEmail":
        await UserModel.update(
          {
            email: req.body.text,
          },
          {
            where: {
              id: req.id,
            },
          }
        );
        break;
      default:
        await UserModel.update(
          {
            email: req.body.text,
          },
          {
            where: {
              id: req.id,
            },
          }
        );
    }

    res.json("success");
  } catch (err) {
    return res.status(404).json({
      message: "user not found",
    });
  }
};
