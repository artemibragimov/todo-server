import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_USER_PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT
})

export const UserModel = sequelize.define('User', {
  login: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique:true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});