import mongoose from "mongoose";

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
        enum:["user", "admin"],
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

export const User = mongoose.model("User", UserSchema);