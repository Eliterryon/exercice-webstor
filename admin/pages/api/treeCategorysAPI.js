import { mongooseConnect } from "@/lib/mongoos";
import { Category } from "@/models/categoryModel";
import mongoose from "mongoose";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
    const {method} = req;
    mongoose.Promise = mongooseConnect()
    const session = await getServerSession(req, res, authOptions)
    isAdminRequest(res, session)

    if (method === "GET") {
        res.status(200).json(await Category.find().populate("parent"));
    }
}