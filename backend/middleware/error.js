 export const errorHandler = (err, req, res, next) => {
     console.log(err.stack.blue);
     const error = {...err};
    if(error.name === "CastError"){
        error.message = "ene ID buruu butetstei bn!";
        error.statusCode = 400;
    };
    if(error.code === 11000){
        error.message = "ene talbariin utga ali hedin bn!";
        error.statusCode = 400;
    };
    res.status(error.statusCode || 500).json({
        success: false,
        error: error,
    });
}