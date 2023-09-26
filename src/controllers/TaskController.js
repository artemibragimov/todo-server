import { TaskModel } from "../../models/TaskModel.js";

export const getAllTasks = async (req, res) => {
    try {
        const pageSize = 7
        let tasks = {
            tasks: [],
            totalTasks: null
        }

        switch (req.query.filter) {

            case 'All':
                tasks.tasks = await TaskModel.findAll({
                    offset: (req.query.currentPage - 1) * pageSize,
                    limit: 7
                })
                tasks.totalTasks = (await TaskModel.findAll()).length

                break

            case 'Done':
                tasks.tasks = await TaskModel.findAll({
                    where: {
                        isDone: true
                    },
                    offset: (req.query.currentPage - 1) * pageSize,
                    limit: 7
                })
                tasks.totalTasks = (await TaskModel.findAll({
                    where: {
                        isDone: true
                    }
                })).length
                break
            case 'Undone':
                tasks.tasks = await TaskModel.findAll({
                    where: {
                        isDone: false
                    },
                    offset: (req.query.currentPage - 1) * pageSize,
                    limit: 7
                })
                tasks.totalTasks = (await TaskModel.findAll({
                    where: {
                        isDone: false
                    }
                })).length
                break
            case 'firstNew':
                tasks.tasks = await TaskModel.findAll({
                    order: [
                        ['date', 'DESC'],
                        ['id', 'DESC']
                    ],
                    offset: (req.query.currentPage - 1) * pageSize,
                    limit: 7
                })
                tasks.totalTasks = (await TaskModel.findAll({
                    order: [
                        ['date', 'DESC'],
                        ['id', 'DESC']
                    ]
                })).length
                break
            case 'firstOld':
                tasks.tasks = await TaskModel.findAll({
                    order: [
                        ['date'],
                        ['id']
                    ],
                    offset: (req.query.currentPage - 1) * pageSize,
                    limit: 7
                })
                tasks.totalTasks = (await TaskModel.findAll({
                    order: [
                        ['date'],
                        ['id']
                    ]
                })).length

                break

            default:
                tasks.tasks = await TaskModel.findAll({
                    where: {
                        date: new Date().toLocaleString().slice(0, 10)
                    },
                    order: [
                        ['id']
                    ],
                    offset: (req.query.currentPage - 1) * pageSize,
                    limit: 7
                })

                tasks.totalTasks = (await TaskModel.findAll({
                    where: {
                        date: new Date().toLocaleString().slice(0, 10)
                    }
                })).length

        }

        res.json(tasks)
    } catch (err) {
        res.status(500).json({
            message: 'Failed to load tasks'
        })
    }
}

export const createTask = async (req, res) => {
    try {
        const newTask = await TaskModel.create({
            name: req.body.name
        })
        res.status(201).json(newTask)
    } catch (err) {
        res.status(500).json({
            message: 'Failed to create task'
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        await TaskModel.destroy({
            where: {
                id: req.body.id
            }
        })

        res.json({
            message: 'task deleted'
        })

    } catch (err) {
        res.status(500).json({
            message: 'Failed to delete task'
        })
    }
}

export const updateTask = async (req, res) => {
    try {

        if (req.body.name) {
            await TaskModel.update({
                name: req.body.name
            }, {
                where: {
                    id: req.body.id
                }
            })
        } else {
            const task = await TaskModel.findOne({
                where: {
                    id: req.body.id
                }
            })
            await TaskModel.update({
                isDone: !task.isDone
            }, {
                where: {
                    id: req.body.id
                }
            })
        }

        res.json({
            message: 'task updated'
        })

    } catch (err) {
        res.status(500).json({
            message: 'Failed to update task'
        })
    }
}
