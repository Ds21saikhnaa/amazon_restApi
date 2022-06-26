import { cat } from "../models/Category.js"
import { MyError } from "../utils/myError.js";
//import { asyncHandler } from "../middleware/asyncHandler.js";
import asyncHandler from "express-async-handler"
export const getCategories = asyncHandler(async(req, res, next) => {
    const sort = req.query.sort
    delete req.query.sort;
    const select = req.query.select;
    delete req.query.select;
    console.log(sort, select);
    const categories = await cat.find(req.query, select).sort(sort);
    res.status(200).json({
        success: true,
        data: categories,
    });
});
export const getCategory = asyncHandler(async(req, res, next) => {
    const category = await cat.findById(req.params.id);

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
        const category = await cat.findByIdAndDelete(req.params.id);
        if(!category){
            throw new MyError(`${req.params.id} Id-tai medeelel algaa`, 400);
        }
        res.status(200).json({
            success: true,
            data: category,
        });
});