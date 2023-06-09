import express from 'express'
// import cors from 'cors';
import mongoose from 'mongoose'
import router from './router.js'
import { config as dotenvConfig } from 'dotenv';


const PORT = 5000
const db = process.env.DB

dotenvConfig();

const app = express()

// app.use(cors());
app.use(express.json())
app.use('/api', router)

// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: 'GET, POST, OPTIONS',
//     allowedHeaders: 'Content-Type, Authorization',
//     credentials: true
//   }));

async function startApp() {
    try {
        await mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, console.log("Server start"))
    } catch (error) {
        console.log(error)
    }
}

startApp()