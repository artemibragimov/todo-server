import { TaskServices } from '../services/index.js';
import { defineFilter } from '../utils/defineFilter.js';

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

export const getTasks = async (req, res, next) => {
  try {
    res.json(
      await TaskServices.getTasks({
        userId: req.id,
        currentPage: req.query.currentPage,
        filter: defineFilter(req.query.filter),
      })
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

export const deleteTask = async (req, res, next) => {
  try {
    res.json(
      await TaskServices.deleteTask({ id: req.body.id, userId: req.id })
    );
  } catch (err) {
    next(err);
  }
};
