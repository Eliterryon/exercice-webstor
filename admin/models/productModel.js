import mongoose, { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
    title : {type: String, required : true},
    images: [{type:String}],
    description : {type: String},
    categogy : {type: mongoose.Types.ObjectId, ref:'Category'},
    price : {type: Number, required : true}
})

export const Product = models?.Product  || model("Product", ProductSchema)

