import { TaskModel } from '../models/TaskModel.js';
import { pageSize } from '../config/general.config.js';

export const getTasks = async ({ userId, currentPage, filter }) => {
  filter.where.userId = userId;

  const tasks = await TaskModel.findAndCountAll({
    where: filter.where,
    order: filter.order,
    offset: (currentPage - 1) * pageSize,
    limit: pageSize,
  });

  return {
    tasks: tasks.rows,
    totalTasks: tasks.count,
  };
};

export const createTask = async ({ userId, name }) => {
  const newTask = await TaskModel.create({
    name: name,
    userId: userId,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString().slice(0, 5),
  });

  return {
    newTask,
  };
};

export const deleteTask = async ({ id, userId }) => {
  await TaskModel.destroy({
    where: {
      id: id,
      userId: userId,
    },
  });
  return {
    message: 'task deleted',
  };
};

export const updateTask = async ({ userId, id, name, isDone }) => {
  await TaskModel.update(
    {
      name: name,
      isDone: isDone,
    },
    {
      where: {
        id: id,
        userId: userId,
      },
    }
  );

  return {
    message: 'task updated',
  };
};
