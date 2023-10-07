import { DataTypes } from 'sequelize';
import { sequelize } from '../services/db.services.js';

export const TaskModel = sequelize.define(
  'Task',
  {
    name: DataTypes.STRING,
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
