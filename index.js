import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import { config as dotenvConfig } from 'dotenv';


const PORT = 5000
const db = process.env.DB

dotenvConfig(); // Load environment variables

const app = express()

app.use(express.json())
app.use('/api', router)

console.log('Db variable:', process.env.DB);

async function startApp() {
    try {
        await mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, console.log("Server start"))
    } catch (error) {
        console.log(error)
    }
}

startApp()