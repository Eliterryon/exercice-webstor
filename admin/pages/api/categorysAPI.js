import { mongooseConnect } from "@/lib/mongoos";
import { Category } from "@/models/categoryModel";
import mongoose from "mongoose";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
    const {method} = req;
    mongoose.Promise = mongooseConnect();

    const session = await getServerSession(req, res, authOptions)
    isAdminRequest(res, session)

    if (method === "POST") {
        const {name, parent} = req.body;
        const prodDoc = await Category.create({
            name, 
            parent: parent || undefined,
        });
        res.status(200).json(prodDoc);
    }

    if (method === "GET") {
        res.status(200).json(await Category.find().populate("parent"));
    }

    if (method === "PUT") {
        const {name, parent, _id} = req.body;
        await Category.updateOne({_id}, {name, parent});
        res.status(200).json(true);
    }

    if (method === "DELETE") {
        if(req.query?.id){
            const prodDoc = await Category.deleteOne({_id:req.query?.id});
            res.json(prodDoc)
        }
    }
}
  