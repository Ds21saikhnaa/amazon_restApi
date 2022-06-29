import { book } from "../models/Book.js"
import { MyError } from "../utils/myError.js";
import asyncHandler from "express-async-handler";
//api/v1/books
//api/v1/categories/:catId/books
export const getBooks = asyncHandler(async(req, res, next) => {
    let query;
    if(req.params.categoryId){
        query = book.find({category: req.params.categoryId});
    }else{
        query = book.find().populate({
            path:"category",
            select: "name averagePrice",
        });
    }

    const books = await query;

    res.status(200).json({
        success: true,
        count: books.length,
        data: books,
    })
})