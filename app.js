import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cors from 'cors'
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

app.set("view engine", "ejs");


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = __dirname+'/uploads/'
console.log(__dirname)
console.log(uploadPath)


const port = process.env.PORT
const DATABASE_URL= process.env.DATABASE_URL

//cors policy
app.use(cors())

//database connectio 
connectDB(DATABASE_URL);

app.use(express.json())



//load routes
app.use("/api/user",userRoutes )

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})