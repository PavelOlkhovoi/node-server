import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import router from './router.js'
import { config as dotenvConfig } from 'dotenv';

const PORT = process.env.PORT
dotenvConfig();

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use('/api', router)


async function startApp() {
    try {
        await mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, console.log("Server start"))
    } catch (error) {
        console.log(error)
    }
}

startApp()