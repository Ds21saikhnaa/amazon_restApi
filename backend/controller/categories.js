export const getCategories = (req, res, next) => {
    res.status(200).json({
        hello: "snu",
        data: ["adal", "aimshig"],
    })
}
export const getCategory = (req, res, next) => {
    res.status(200).json({
        hello: "snu",
        data: `${req.params.id}-ta cat medeeelel`,
    })
}
export const createCategory = (req, res, next) => {
    res.status(200).json({
        hello: "snu",
        data: "uuslee"
    })
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