import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import { config as dotenvConfig } from 'dotenv';


const PORT = 5000
const db = process.env.DB

dotenvConfig();

const app = express()

app.use(express.json())
app.use('/api', router)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

async function startApp() {
    try {
        await mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, console.log("Server start"))
    } catch (error) {
        console.log(error)
    }
}

startApp()