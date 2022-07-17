import { book } from "../models/Book.js"
import { cat } from "../models/Category.js"
import { MyError } from "../utils/myError.js";
import path  from "path";
import { paginate } from "../utils/paginate.js";
import asyncHandler from "express-async-handler";
//api/v1/books
export const getBooks = asyncHandler(async(req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort
    const select = req.query.select;
    ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);
    //pagination
    const pagination = await paginate(page, limit, book);
    const books = await book.find(req.query, select).populate({
        path:"category",
        select: "name averagePrice",
    }).sort(sort).skip(pagination.start - 1).limit(limit);
    
    res.status(200).json({
        success: true,
        count: books.length,
        data: books,
        pagination
    })
});

export const getUserBooks = asyncHandler(async(req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort
    const select = req.query.select;
    ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);
    //pagination
    const pagination = await paginate(page, limit, book);
    req.query.createUser = req.userId;
    const books = await book.find(req.query, select).populate({
        path:"category",
        select: "name averagePrice",
    }).sort(sort).skip(pagination.start - 1).limit(limit);
    
    res.status(200).json({
        success: true,
        count: books.length,
        data: books,
        pagination
    })
});

//api/v1/categories/:catId/books
export const getCategoryBooks = asyncHandler(async(req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort
    const select = req.query.select;
    ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);
    //pagination
    const pagination = await paginate(page, limit, book);
    const books = await book.find({...req.query, category: req.params.categoryId}, select).sort(sort).skip(pagination.start - 1).limit(limit);
    res.status(200).json({
        success: true,
        count: books.length,
        data: books,
        pagination
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
    
    req.body.createUser = req.userId;
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
    if(booked.createUser.toString() !== req.userId && req.userRole !== "admin"){
        throw new MyError("Ta zowhon oorin nomiig zaswarlah erhtei", 403)
    }
    booked.remove();
    res.status(200).json({
        success: true,
        data: booked,
    })
});
export const updateBook = asyncHandler(async(req, res, next) => {
    const booked = await book.findById(req.params.id);
    if(!booked){
        throw new MyError(`${req.params.id} Id-tai medeelel algaa`, 400);
    }
    if(booked.createUser.toString() !== req.userId && req.userRole !== "admin"){
        throw new MyError("Ta zowhon oorin nomiig zaswarlah erhtei", 403)
    }
    req.body.updateUser = req.userId;
    for(let attr in req.body){
        booked[attr] = req.body[attr];
    }
    booked.save();
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

    booked.photo = file.name;
    booked.save();
        res.status(200).json({
            success: true,
            data: file.name,
        })
    })
});