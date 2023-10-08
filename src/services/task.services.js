import { TaskModel } from '../models/TaskModel.js';
import { pageSize } from '../config/general.config.js';

export const getTasks = async (data) => {
  const tasks = await TaskModel.findAll({
    where: data.filter.where,
    order: data.filter.order,
    offset: (data.currentPage - 1) * pageSize,
    limit: pageSize,
  });

  const totalTasks = (
    await TaskModel.findAll({
      where: data.filter.where,
    })
  ).length;

  return {
    tasks,
    totalTasks,
  };
};

export const createTask = async (data) => {
  const newTask = await TaskModel.create({
    name: data.name,
    userId: data.userId,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString().slice(0, 5),
  });

  return {
    newTask,
  };
};

export const deleteTask = async (data) => {
  await TaskModel.destroy({
    where: {
      id: data.id,
      userId: data.userId,
    },
  });
  return {
    message: 'task deleted',
  };
};

export const updateTask = async (data) => {
  await TaskModel.update(
    {
      name: data.name,
      isDone: data.isDone,
    },
    {
      where: {
        id: data.id,
        userId: data.userId,
      },
    }
  );

  return {
    message: 'task updated',
  };
};
