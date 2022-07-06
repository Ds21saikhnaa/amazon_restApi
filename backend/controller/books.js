import { book } from "../models/Book.js"
import { cat } from "../models/Category.js"
import { MyError } from "../utils/myError.js";
import path  from "path";
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
});
export const getBook = asyncHandler(async(req, res, next) => {
   
    const booked = await book.findById(req.params.id);
    if(!booked){
        throw new MyError(req.params.id + "id-ta nom baihgui baina.", 404);
    }
    res.status(200).json({
        success: true,
        data: booked,
    })
});


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
});
export const deleteBook = asyncHandler(async(req, res, next) => {
   
    const booked = await book.findById(req.params.id);
    if(!booked){
        throw new MyError(req.params.id + "id-ta nom baihgui baina.", 404);
    }
    booked.remove();
    res.status(200).json({
        success: true,
        data: booked,
    })
});
export const updateBook = asyncHandler(async(req, res, next) => {
    const booked = await book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if(!booked){
        throw new MyError(`${req.params.id} Id-tai medeelel algaa`, 400);
    }
    res.status(200).json({
        success: true,
        data: booked,
    });
});
// PUT: api/v1/books/:id/photo
export const uploadBookPhoto = asyncHandler(async(req, res, next) => {
    const booked = await book.findById(req.params.id);
    if(!booked){
        throw new MyError(`${req.params.id} Id-tai medeelel algaa`, 400);
    }

    const file = req.files.file; 
    if(!file.mimetype.startsWith("image")){
        throw new MyError(`ta zurag upload hiine uu!`, 400);
    } 
    if(file.size > process.env.MAX_UPLOAD_FILE_SIZE){
        throw new MyError(`tanii zuragni hemjee hetersen bn!`, 400);
    }

    file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, err => {
        if(err){
            throw new MyError(`file huulahad aldaa garlaa!`, 400);
        }

    book.photo = file.name;
    book.save();
        res.status(200).json({
            success: true,
            data: file.name,
        })
    })
    // res.status(200).json({
    //     success: true,
    //     data: booked,
    // });
});