import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

import connectDB from './config/connectDB.js';
import routes from './routes/index.route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));

// Routes
routes(app);

// ket noi mongodb
connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server chay tren PORT : ${PORT}!`);
});
