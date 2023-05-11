import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import connectDB from './ConnectDB.js'
import PersonRouter from './routers/PersonRouter.js';
import CoronaRouter from './routers/CoronaRouter.js';


connectDB();
const app = express();

// const Storage = multer.diskStorage({
//     destination:'uploads',
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname);
//     },
// });
app.use(cors())
app.use(bodyParser.json());

app.use('/uploads',express.static('uploads'))
app.use('/person',PersonRouter)
app.use('/Corona',CoronaRouter)

app.listen(process.env.PORT,()=>{
    console.log(`example app on http://localhost:${process.env.PORT}`)
})
