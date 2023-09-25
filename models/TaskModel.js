import { DataTypes } from "sequelize";
import sequelize from '../1111/db/index.js'

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
        defaultValue: false
    }
},
    {
        timestamps: true,
        // Отключаем `updatedAt`
        updatedAt: false
    });
(async () => {
    // Пересоздаем таблицу в БД
    await sequelize.sync({ force: true })
})()