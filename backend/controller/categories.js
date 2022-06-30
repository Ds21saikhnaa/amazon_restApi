import { cat } from "../models/Category.js"
import { MyError } from "../utils/myError.js";
//import { asyncHandler } from "../middleware/asyncHandler.js";
import asyncHandler from "express-async-handler"
export const getCategories = asyncHandler(async(req, res, next) => {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort
    const select = req.query.select;
    ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);
    //pagination
    const total = await cat.countDocuments();
    const pageCount = Math.ceil(total/limit);
    const start = (page - 1) * limit + 1;
    let end = start + limit - 1;
    if(end>total) end = total;

    const pagination = {total, pageCount, start , end, limit};

    if(page < pageCount) pagination.nextPage = page + 1;
    if(page > 1 ) pagination .prevPage = page - 1;
    
    console.log(sort, select);
    const categories = await cat.find(req.query, select).sort(sort).skip(start - 1).limit(limit);
    res.status(200).json({
        success: true,
        data: categories,
        ...pagination
    });
});
export const getCategory = asyncHandler(async(req, res, next) => {
    const category = await cat.findById(req.params.id).populate("books");

    if(!category){
        throw new MyError(`${req.params.id} Id-tai medeelel algaa`, 400);
    }
    res.status(200).json({
        success: true,
        data: category,
    });
    // try{
    // }catch(err){
    //     next(err);
    // }
});
export const createCategory = asyncHandler(async (req, res, next) => {
        const category = await cat.create(req.body);

        res.status(200).json({
            success: true,
            data: category,
        })
});
export const updateCategory = asyncHandler(async(req, res, next) => {
        const category = await cat.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if(!category){
            throw new MyError(`${req.params.id} Id-tai medeelel algaa`, 400);
        }
        res.status(200).json({
            success: true,
            data: category,
        });
});
export const deleteCategory = asyncHandler(async(req, res, next) => {
        const category = await cat.findById(req.params.id);
        if(!category){
            throw new MyError(`${req.params.id} Id-tai medeelel algaa`, 400);
        }
        category.remove();
        res.status(200).json({
            success: true,
            data: category,
        });
});