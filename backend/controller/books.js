import { book } from "../models/Book.js"
import { cat } from "../models/Category.js"
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
export const getBook = asyncHandler(async(req, res, next) => {
   
    const booked = await book.findById(req.params.id);
    if(!booked){
        throw new MyError(req.params.id + "id-ta nom baihgui baina.", 404);
    }
    res.status(200).json({
        success: true,
        data: booked,
    })
})

export const createBook = asyncHandler(async(req, res, next) => {
   
    const category = await cat.findById(req.body.category);
    if(!category){
        throw new MyError(req.body.category + "id-ta nom baihgui baina.", 400);
    }

    const booked = await book.create(req.body);
    
    res.status(200).json({
        success: true,
        data: booked,
    })
})