import { TaskModel } from '../models/TaskModel.js';
import { pageSize } from '../config/general.config.js';
import { TaskServices } from '../services/index.js';

export const getAllTasks = async (req, res) => {
  try {
    let tasks = {
      tasks: [],
      totalTasks: null,
    };

    switch (req.query.filter) {
      case 'All':
        tasks.tasks = await TaskModel.findAll({
          where: { userId: req.id },
          offset: (req.query.currentPage - 1) * pageSize,
          limit: 7,
        });
        tasks.totalTasks = (
          await TaskModel.findAll({ where: { userId: req.id } })
        ).length;

        break;

      case 'Done':
        tasks.tasks = await TaskModel.findAll({
          where: {
            userId: req.id,
            isDone: true,
          },
          offset: (req.query.currentPage - 1) * pageSize,
          limit: 7,
        });
        tasks.totalTasks = (
          await TaskModel.findAll({
            where: {
              userId: req.id,
              isDone: true,
            },
          })
        ).length;
        break;
      case 'Undone':
        tasks.tasks = await TaskModel.findAll({
          where: {
            userId: req.id,
            isDone: false,
          },
          offset: (req.query.currentPage - 1) * pageSize,
          limit: 7,
        });
        tasks.totalTasks = (
          await TaskModel.findAll({
            where: {
              userId: req.id,
              isDone: false,
            },
          })
        ).length;
        break;
      case 'firstNew':
        tasks.tasks = await TaskModel.findAll({
          where: {
            userId: req.id,
          },
          order: [
            ['date', 'DESC'],
            ['time', 'DESC'],
            ['id', 'DESC'],
          ],
          offset: (req.query.currentPage - 1) * pageSize,
          limit: 7,
        });
        tasks.totalTasks = (
          await TaskModel.findAll({
            where: {
              userId: req.id,
            },
          })
        ).length;
        break;
      case 'firstOld':
        tasks.tasks = await TaskModel.findAll({
          where: {
            userId: req.id,
          },
          order: [['date'], ['time'], ['id']],
          offset: (req.query.currentPage - 1) * pageSize,
          limit: 7,
        });
        tasks.totalTasks = (
          await TaskModel.findAll({
            where: {
              userId: req.id,
            },
          })
        ).length;

        break;

      default:
        tasks.tasks = await TaskModel.findAll({
          where: {
            date: new Date().toLocaleDateString(),
            userId: req.id,
          },
          order: [['id']],
          offset: (req.query.currentPage - 1) * pageSize,
          limit: 7,
        });

        tasks.totalTasks = (
          await TaskModel.findAll({
            where: {
              date: new Date().toLocaleString().slice(0, 10),
              userId: req.id,
            },
          })
        ).length;
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to load tasks',
    });
  }
};

export const createTask = async (req, res, next) => {
  try {
    res.status(201).json(
      await TaskServices.createTask({
        userId: req.id,
        name: req.body.name,
      })
    );
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    res.json(
      await TaskServices.deleteTask({ id: req.body.id, userId: req.id })
    );
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    res.json(
      await TaskServices.updateTask({
        userId: req.id,
        id: req.body.id,
        name: req.body.name,
        isDone: req.body.isDone,
      })
    );
  } catch (err) {
    next(err);
  }
};
