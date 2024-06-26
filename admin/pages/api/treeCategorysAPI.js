import { mongooseConnect } from "@/lib/mongoos";
import { Category } from "@/models/categoryModel";
import mongoose from "mongoose";

export default async function handler(req, res) {
    const {method} = req;
    mongoose.Promise = mongooseConnect()

    if (method === "GET") {
        res.status(200).json(await Category.find().populate("parent"));
    }
}