import 'dotenv/config'
import express from 'express'
import {TaskController, UserController} from "./controllers/index.js";
import cors from 'cors'


const app = express()
const port = process.env.PORT3001
const domain = process.env.DOMAIN
app.use(cors())
app.use(express.json())

app.get('/', TaskController.getAllTasks)
app.post('/', TaskController.createTask)
app.delete('/', TaskController.deleteTask)
app.put('/', TaskController.updateTask)

app.post('/signup', UserController.createUser)


app.listen(port, () => {
    console.log('Server started on ' + domain + ':' + port)
})