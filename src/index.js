import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT
app.use(express.json())

app.get('/', (req, res) => res.json(
    {
        title: 'Port',
        port: port
    }))

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})