import { cat } from "../models/Category.js"
export const getCategories = async(req, res, next) => {
    try{
        const categories = await cat.find();
        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch(err){
        next(err);
    }
};
export const getCategory = async(req, res, next) => {
    try{
        const category = await cat.findById(req.params.id);
        if(!category){
            return res.status(400).json({
                success: false,
                err: `${req.params.id} Id-tai medeelel alga`,
            }); 
        }
        res.status(200).json({
            success: true,
            data: category,
        });
    }catch(err){
        next(err);
    }
}
export const createCategory = async (req, res, next) => {
    try{
        const category = await cat.create(req.body);

        res.status(200).json({
            success: true,
            data: category,
        })
    } catch(err){
        next(err);
    }
}
export const updateCategory = async(req, res, next) => {
    try{
        const category = await cat.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if(!category){
            return res.status(400).json({
                success: false,
                err: `${req.params.id} Id-tai medeelel alga`,
            }); 
        }
        res.status(200).json({
            success: true,
            data: category,
        });
    }catch(err){
        next(err);
    }
}
export const deleteCategory = async(req, res, next) => {
    try{
        const category = await cat.findByIdAndDelete(req.params.id);
        if(!category){
            return res.status(400).json({
                success: false,
                err: `${req.params.id} Id-tai medeelel alga`,
            }); 
        }
        res.status(200).json({
            success: true,
            data: category,
        });
    }catch(err){
        next(err);
    }
}