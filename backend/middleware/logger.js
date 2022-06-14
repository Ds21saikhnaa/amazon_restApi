export const logger = (req, res, next) => {
    req.userID = "12erfsdvndyuveio"
    console.log(`${req.method} ${req.protocol}://${req.host}${req.originalUrl}`);
    next();
}