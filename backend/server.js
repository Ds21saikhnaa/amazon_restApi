import  express  from "express";
import  dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import morgan from "morgan";
import rotatingFileStream from "rotating-file-stream"
import catRouter from "./router/categories.js";
import {logger} from "./middleware/logger.js";
dotenv.config({path: "./config/config.env"});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
const accessLogStream = rotatingFileStream.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

const app = express();
app.use(logger);
app.use(morgan('combined', { stream: accessLogStream }))
app.use("/api/v1/categories/",catRouter);
app.listen(process.env.PORT, console.log(`hello ${process.env.PORT} server`));