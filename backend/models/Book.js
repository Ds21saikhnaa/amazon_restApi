import mongoose from "mongoose";
import { transliterate as tr, slugify } from "transliteration";
const BookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "nomiin neriig oruulna uu!"],
        unique: true,
        trim: true,
        maxlength: [250, "nomiin ner urt deed tal n 250 temdegt bh ystoi."],
    },
    photo :{
        type: String,
        default: "no-photo.jpg",
    },
    author:{
        type: String,
        required: [true, "zohiogchin neriig oruulna uu!"],
        trim: true,
        maxlength: [50, "zohiogchiin ner urt deed tal n 50 temdegt bh ystoi."],
    },
    averageRating: {
        type: Number,
        min: [1, "nomnii rating hamgiin bagada 1 bh ystoi!"],
        max: [10, "nomnii rating hamgiin ihdee 10 bh ystoi!"],
    },
    price: {
        type: Number,
        required: [true, "nomnii uniig oruulna uu!"],
        min: [500, "nomnii une hamgiin bagada 500 bh ystoi!"],
    },
    balance:Number,
    content:{
        type: String,
        required: [true, "nomnii tailbariig oruulna uu!"],
        trim: true,
        maxlength: [5000, "nomnii tailbariin urt deed tal n 25 temdegt bh ystoi."],
    },
    bestSeller:{
        type:Boolean,
        default: false,
    },
    available: [String],
    category:{
        type: mongoose.Schema.ObjectId,
        ref:"Category",
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export const book = mongoose.model("Book", BookSchema);