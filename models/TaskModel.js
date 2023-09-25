import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize('local_db_todo', 'postgres', '17052002', {
  host: 'localhost',
  dialect: 'postgres'
})

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
  timestamps: true,
  updatedAt: false
});