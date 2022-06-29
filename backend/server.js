import  express  from "express";
import  dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import morgan from "morgan";
import {connectDB} from "./config/db.js"
import rotatingFileStream from "rotating-file-stream"
import catRouter from "./router/categories.js";
import bookRouter from "./router/books.js";
import {logger} from "./middleware/logger.js";
import { errorHandler } from "./middleware/error.js";
import colors from "colors";
import exp from "constants";

//process.env ruu bichih
const app = express();
dotenv.config({path: "./config/config.env"});
connectDB();

//handalt hadgalah
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
const accessLogStream = rotatingFileStream.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

app.use(express.json());
app.use(logger);
app.use(morgan('combined', { stream: accessLogStream }))
app.use("/api/v1/categories/",catRouter);
app.use("/api/v1/books/",bookRouter)
app.use(errorHandler);

const server =  app.listen(process.env.PORT, console.log(`hello ${process.env.PORT} server`.underline.yellow.bold));
process.on("ubhandledRejection", (err, promise) => {
    console.log(`aldaa garsaan: ${err.message}`.underline.red.bold);
    server.close(() => {
        process.exit(1);
    });
});