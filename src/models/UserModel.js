import { DataTypes } from 'sequelize';
import { sequelize } from '../services/db.services.js';

export const UserModel = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    login: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);
