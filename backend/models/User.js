import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { nextTick } from "process";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "hereglegchiin ner oruulna uu!"]
    },
    email: {
        type: String,
        required: [true, "hereglegchiin email zaawal oruulna uu!"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "email hayg buruu bn!"]
    },
    role: {
        type: String,
        required: [true, "hereglegchiin erhiig oruulna uu!"],
        enum:["user", "operator"],
        default: "user",
    },
    password:{
        type:String,
        minlength: 4,
        required: [true, "nuuts ugee oruulna uu!"],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt:{
        type: Date,
        default: Date.now
    }
});
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getJsonWebToken = function(){
    const token = jwt.sign({id: this._id, role: this.role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN
    });
    return token;
}

UserSchema.methods.checkPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
UserSchema.methods.generatePasswordChangeToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
}
export const User = mongoose.model("User", UserSchema);