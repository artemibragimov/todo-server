import 'dotenv/config'
import express from 'express'
import {TaskController} from "./controllers/index.js";

const app = express()
const port = process.env.PORT3001
const domain = process.env.DOMAIN
app.use(express.json())

app.get('/', TaskController.getAllTasks)
app.post('/', TaskController.createTask)
app.delete('/', TaskController.deleteTask)
app.put('/', TaskController.updateTask)


app.listen(port, () => {
    console.log('Server started on ' + domain + ':' + port)
})