import fs from "fs";
import mongoose from "mongoose";
import colors from "colors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { cat } from "./models/Category.js";
dotenv.config({path: "./config/config.env"});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
      //useCreateIndex: true,
    //useFindAndModify: false,
    useUnifiedTopology: true,
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const categories = JSON.parse(
    fs.readFileSync(__dirname + "/data/categories.js", "utf-8")
);
const importData = async() => {
    try{
        await cat.create(categories);
        console.log("import is done...".green.inverse);
    }catch (err){
        console.log(err.red.inverse);
    }
};
const deleteData = async() => {
    try{
        await cat.deleteMany();
        console.log("delete is done...".green.inverse);
    }catch (err){
        console.log(err.red.inverse);
    }
};

if(process.argv[2] === "-i") importData();
else if(process.argv[2] === "-d") deleteData();