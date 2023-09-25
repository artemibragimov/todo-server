import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize('todo_db', 'postgres', '17052002', {
    host: 'localhost',
    dialect: 'postgres'
})

// Создаем модель для пользователя со следующими атрибутами
export const Task = sequelize.define('Task', {
    // название таски
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // выполнена/не выполнена
    isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        //allowNull: false
    }
},
    {
        timestamps: true,
        // Изменяем название
        createdAt: 'createTime',
        // Отключаем `createdAt`
        updatedAt: false,
    });
(async () => {
    // Пересоздаем таблицу в БД
    await sequelize.sync({force: true})
})()