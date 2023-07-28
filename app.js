import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cors from 'cors'
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bodyParser from 'body-parser'
// const serverless= require('serverless-http')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// parse application/json
app.use(bodyParser.json());


app.set("view engine", "ejs");


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + '/public'));
const uploadPath = __dirname+'/uploads/'
console.log(__dirname)
console.log(uploadPath)


const port = process.env.PORT
const DATABASE_URL= process.env.DATABASE_URL

//cors policy
app.use(cors())
app.use(express.json())

//database connectio 
connectDB(DATABASE_URL);





//load routes
app.use("/",userRoutes )
// app.use("/.netlify/functions/api/user",userRoutes )


// module.exports.handler = serverless(app);

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})