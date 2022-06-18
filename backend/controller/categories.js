import { cat } from "../models/Category.js"
export const getCategories = (req, res, next) => {
    res.status(200).json({
        hello: "snu",
        data: ["adal", "aimshig"],
        user: req.userID
    })
}
export const getCategory = (req, res, next) => {
    res.status(200).json({
        hello: "snu",
        data: `${req.params.id}-ta cat medeeelel`,
    })
}
export const createCategory = async (req, res, next) => {
    try{
        const category = await cat.create(req.body);

        res.status(200).json({
            success: true,
            data: category,
        })
    } catch(err){
        res.status(400).json({
            success: false,
            err: err,
        })
    }
}
export const updateCategory = (req, res, next) => {
    res.status(200).json({
        hello: "snu",
        data: `${req.params.id}-ta cat update hiigdlee`,
    })
}
export const deleteCategory = (req, res, next) => {
    res.status(200).json({
        hello: "snu",
        data: `${req.params.id}-ta cat ustlaa`,
    })
}