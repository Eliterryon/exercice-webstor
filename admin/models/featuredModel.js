import mongoose, { Schema, model, models } from "mongoose";

const FeaturedSchema = new Schema({
    featuredID  : {type: mongoose.Types.ObjectId, ref:'Product'},
})

export const Featured = models?.Featured  || model("Featured", FeaturedSchema)

