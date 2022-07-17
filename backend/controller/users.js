import { User } from "../models/User.js"
import { MyError } from "../utils/myError.js";
import { paginate } from "../utils/paginate.js";
import asyncHandler from "express-async-handler"
import { sendEmail } from "../utils/email.js";
import crypto from "crypto";

//register
export const userRegister = asyncHandler(async(req, res, next) => {
    const user = await User.create(req.body);
    const token = user.getJsonWebToken();
    res.status(200).json({
        success: true,
        user: user,
        token
    });
});
//login
export const userLogin = asyncHandler(async(req, res, next) => {
    const {email, password} = req.body;
    //orolt shalgana
    if(!email || !password) {
        throw MyError("email bolon nuuts ugee damjiilna uu!", 404);
    }
    //tuhain hereglegchig haina
    const user = await User.findOne({email}).select("+password");
    if(!user){
        throw new MyError("email bolon nuuts ugee zow oruulna uu!", 401);
    }
    const pass = await user.checkPassword(password);

    if(!pass){
        throw new MyError("email bolon nuuts ugee zow oruulna uu!", 401);
    }
    res.status(200).json({
        success: true,
        token: user.getJsonWebToken(),
        user: user,
    });
});

export const getUsers = asyncHandler(async(req, res, next) => {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort
    const select = req.query.select;
    ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);
    //pagination
    const pagination = await paginate(page, limit, User);
    
    console.log(sort, select);
    const users = await User.find(req.query, select).sort(sort).skip(pagination.start - 1).limit(limit);
    res.status(200).json({
        success: true,
        data: users,
        ...pagination
    });
});
export const getUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        throw new MyError(`${req.params.id} Id-tai hereglegch algaa`, 400);
    }
    res.status(200).json({
        success: true,
        data: user,
    });
    // try{
    // }catch(err){
    //     next(err);
    // }
});
export const createUser = asyncHandler(async (req, res, next) => {
        const user = await User.create(req.body);

        res.status(200).json({
            success: true,
            data: user,
        })
});
export const updateUser = asyncHandler(async(req, res, next) => {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if(!user){
            throw new MyError(`${req.params.id} Id-tai hereglegch algaa`, 400);
        }
        res.status(200).json({
            success: true,
            data: user,
        });
});
export const deleteUser = asyncHandler(async(req, res, next) => {
        const user = await User.findById(req.params.id);
        if(!user){
            throw new MyError(`${req.params.id} Id-tai hereglegch algaa`, 400);
        }
        user.remove();
        res.status(200).json({
            success: true,
            data: user,
        });
});

export const forgotPassword = asyncHandler(async(req, res, next) => {
    if(!req.body.email){
        throw new MyError(`Email bhgui bn`, 400);
    }
    const user = await User.findOne({email: req.body.email});
    if(!user){
        throw new MyError(`${req.body.email} email-tei hereglegch oldsongui`, 400);
    }
    
    const resetToken = user.generatePasswordChangeToken();
    await user.save();
    // await user.save({ validateBeforeSave: false});
    //Email ilgeene
    const link = `https://amazon.mn/changepassword/${resetToken}`; 
    const message = `sain bnu.<br><br>doorh linked darj nuuts ugee solino uu!:<br>${link}`
    await sendEmail({
        email: user.email,
        subject: "Nuuts ug oorchloh huselt",
        message
    })
    res.status(200).json({
        success: true,
        resetToken,
    });
});

export const resetPassword = asyncHandler(async(req, res, next) => {
    if(!req.body.resetToken || !req.body.password){
        throw new MyError(`nuuts ugee damjuul`, 400);
    }

    const encrypted = crypto.createHash("sha256").update(req.body.resetToken).digest("hex");
    const user = await User.findOne({resetPasswordToken: encrypted , resetPasswordExpire:{$gt: Date.now()}});
    if(!user){
        throw new MyError(`huchingui bollo`, 400);
    }
    
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const token = user.getJsonWebToken();

    // await user.save({ validateBeforeSave: false});
    //Email ilgeene
    // const link = `https://amazon.mn/changepassword/${resetToken}`; 
    // const message = `sain bnu.<br><br>doorh linked darj nuuts ugee solino uu!:<br>${link}`
    // await sendEmail({
    //     email: user.email,
    //     subject: "Nuuts ug oorchloh huselt",
    //     message
    // })
    res.status(200).json({
        success: true,
        user: user,
        token
    });
});