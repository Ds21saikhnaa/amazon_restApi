import  express  from "express";
import  dotenv from "dotenv"
import router from "./router/categories.js"
dotenv.config({path: "./config/config.env"})
const app = express();
app.use("/api/v1/categories/",router)
app.listen(process.env.PORT, console.log(`hello ${process.env.PORT} server`));