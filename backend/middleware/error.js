 export const errorHandler = (err, req, res, next) => {
    console.log(err.stack.blue);
    if(err.name === "CastError"){
        err.message = "ene ID buruu butetstei bn!";
        err.statusCode = 400;
    }
    res.status(err.statusCode || 500).json({
        success: false,
        error: err,
    })
}