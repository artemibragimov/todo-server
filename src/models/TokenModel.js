import { DataTypes } from 'sequelize';
import { sequelize } from '../services/db.services.js';

export const TokenModel = sequelize.define(
  'Token',
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
