import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "category-in neriig oruulna uu!"],
        unique: true,
        trim: true,
        maxlength: [50, "category-in ner urt deed tal n 50 temdegt bh ystoi."],
    },
    description : {
        type: String,
        required: [true, "category-in tailbariig zaawal oruulna uu!"],
        maxlength: [500, "category-in tailbariin urt deed tal n 500 temdegt bh ystoi."],
    },
    photo :{
        type: String,
        default: "no-photo.jpg",
    },
    averageRating: {
        type: Number,
        min: [1, "rating hamgiin bagada 1 bh ystoi!"],
        max: [10, "rating hamgiin ihdee 10 bh ystoi!"],
    },
    averagePrice: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export const cat = mongoose.model("Category", CategorySchema);