import { DataTypes } from "sequelize";
import sequelize from '../db/index.js'

// Создаем модель для пользователя со следующими атрибутами
export const TaskModel = sequelize.define('Task', {
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
        // Отключаем `updatedAt`
        updatedAt: false,
    });
(async () => {
    // Пересоздаем таблицу в БД
    await sequelize.sync({ force: true })
})()