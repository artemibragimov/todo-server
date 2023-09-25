import { Sequelize } from "sequelize";

const sequelize = new Sequelize('todo_db', 'postgres', '17052002', {
    host: 'localhost',
    dialect: 'postgres'
})

export default sequelize;
