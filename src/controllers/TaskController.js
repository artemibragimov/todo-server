import { TaskModel } from "../../models/TaskModel.js";




export const getAllTasks = async (req, res) => {
    try {
        const pageSize = 7
        let tasks = null

        switch (req.query.filter) {

            case 'All':
                tasks = await TaskModel.findAll({
                    offset: (req.query.currentPage - 1) * pageSize,
                    limit: 7
                })
                break

            case 'Done':
                tasks = await TaskModel.findAll({
                    where: {
                        isDone: true
                    },
                    offset: (req.query.currentPage - 1) * pageSize,
                    limit: 7
                })
                break
            case 'Undone':
                tasks = await TaskModel.findAll({
                    where: {
                        isDone: false
                    },
                    offset: (req.query.currentPage - 1) * pageSize,
                    limit: 7
                })
                break
            case 'firstNew':
                tasks = await TaskModel.findAll({
                    order: [
                        ['date', 'DESC'],
                        ['id', 'DESC']
                    ],
                    offset: (req.query.currentPage - 1) * pageSize,
                    limit: 7
                })
                break
            case 'firstOld':
                tasks = await TaskModel.findAll({
                    order: [
                        ['date'],
                        ['id']
                    ],
                    offset: (req.query.currentPage - 1) * pageSize,
                    limit: 7
                })
                break

            default:
                tasks = await TaskModel.findAll({
                    where: {
                        date: new Date().toLocaleString().slice(0, 10)
                    },
                    offset: (req.query.currentPage - 1) * pageSize,
                    limit: 7
                })
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
        await TaskModel.update({
            id: req.body.id
        }, {
            where: {
                name: req.body.name
            }
        })

        res.json({
            message: 'task updated'
        })

    } catch (err) {
        res.status(500).json({
            message: 'Failed to update task'
        })
    }
}
