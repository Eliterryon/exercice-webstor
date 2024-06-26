import { mongooseConnect } from "@/lib/mongoos";
import { Product } from "@/models/productModel";
import mongoose from "mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    const {method} = req;
    mongoose.Promise = mongooseConnect()
    isAdminRequest(res, req);

    if (method === "POST") {
        const {title, description, price, images, categogy} = req.body;
        const prodDoc = await Product.create({
            title, description, price, images, categogy
        })
        res.status(200).json(prodDoc);
    }

    if (method === "GET") {
        if(req.query?.id){
            res.status(200).json(await Product.findOne({_id:req.query.id}));
        } else{
            res.status(200).json(await Product.find());
        }
    }

    if (method === "PUT") {
        const {title, description, price, images, categogy, _id} = req.body;
        const prodDoc = await Product.updateOne({_id}, {title, description, price, images, categogy });
        res.status(200).json(true);
    }

    if (method === "DELETE") {
        if(req.query?.id){
            const prodDoc = await Product.deleteOne({_id:req.query?.id});
            res.json(prodDoc)
        }
    }
}
  