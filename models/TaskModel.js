import { DataTypes } from "sequelize";
import { sequelize } from "./sequelize.js";

export const TaskModel = sequelize.define('Task', {
  name: DataTypes.STRING,
  isDone: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date:{
    type: DataTypes.STRING,
  },
  time:{
    type: DataTypes.STRING,
  }
}, {
  timestamps: false
});