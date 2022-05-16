import  express  from "express";
import  dotenv from "dotenv"
dotenv.config({path: "./config/config.env"})
const app = express();
app.get('/', (req, res) => {
    res.send(`hello ${process.env.PORT} server`)
})
app.listen(process.env.PORT, console.log(`hello ${process.env.PORT} server`));