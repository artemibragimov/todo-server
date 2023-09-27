import { DataTypes } from "sequelize";
import { sequelize } from "./sequelize.js";

export const UserModel = sequelize.define('User', {
  login: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});