import { DataTypes } from "sequelize";
import { sequelize } from "./sequelize.js";

export const TaskModel = sequelize.define('Task', {
  name: DataTypes.STRING,
  isDone: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: new Date().toLocaleString().slice(0, 10)
  }
}, {
  timestamps: false
});