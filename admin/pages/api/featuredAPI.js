import { mongooseConnect } from "@/lib/mongoos";
import { Featured } from "@/models/featuredModel";
import mongoose from "mongoose";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
    const {method} = req;
    mongoose.Promise = mongooseConnect()

    const session = await getServerSession(req, res, authOptions)
    isAdminRequest(res, session)

    if (method === "POST") {
        const {_id} = req.body;
        const prodDoc = await Featured.create({
            _id
        })
        res.status(200).json(prodDoc);
    }

    if (method === "GET") {   
        res.status(200).json(await Featured.find());
    }
    
    if (method === "DELETE") {
        if(req.query?.id){
            const prodDoc = await Featured.deleteOne({_id:req.query?.id});
            res.json(prodDoc)
        }
    }
}
  