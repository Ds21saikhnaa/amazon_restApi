import mongoose from "mongoose";
import { transliterate as tr, slugify } from "transliteration";
const BookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "nomiin neriig oruulna uu!"],
        unique: true,
        trim: true,
        maxlength: [350, "nomiin ner urt deed tal n 350 temdegt bh ystoi."],
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
    }
},{toJSON:{virtuals: true}, toObject:{virtuals: true}}
);

BookSchema.statics.computeCategoryAvaragePrice = async function(catId) {
    const obj = await this.aggregate([
        {$match: {category: catId}},
        {$group: {_id: "$category", avgPrice:{$avg:"$price"}}},
    ]);
    console.log(obj);

    await this.model("Category").findByIdAndUpdate(catId, {
        averagePrice: obj[0].avgPrice,
    });
    return obj;
}

BookSchema.post("save", function() {
    this.constructor.computeCategoryAvaragePrice(this.category);
});

BookSchema.pre("remove", function() {
    this.constructor.computeCategoryAvaragePrice(this.category);
});

BookSchema.virtual("programmist").get(function(){
    if(!this.author) return "";
    let tokens = this.author.split(' ');
    if(tokens.length === 1) tokens = this.author.split(".");
    if(tokens.length === 2) return tokens[1];
    else return tokens[0];
})
export const book = mongoose.model("Book", BookSchema);