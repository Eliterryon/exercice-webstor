import multiparty from 'multiparty';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import { authOptions, isAdminRequest } from './auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function handler(req, res) {
    mongoose.Promise = mongooseConnect()
    
    const session = await getServerSession(req, res, authOptions)
    isAdminRequest(res, session)

    const form = new multiparty.Form();
    const {fields,files} = await new Promise((resolve,reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({fields,files});
        });
    });
    
    const client = new S3Client({
        region:'eu-west-3',
        credentials:{
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });
    
    const links = [];

    for(const file of files.file){
        const ext = file.originalFilename.split('.').pop();
        const newFilename = Date.now() + '.' + ext;
        await client.send(new PutObjectCommand({
            Bucket:'temporaire-eliterryon',
            Key: newFilename,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path),
          }));
          const link = `https://temporaire-eliterryon.s3.amazonaws.com/${newFilename}`;
          links.push(link);
        }
        return res.json({links});
      }

export const config= {
    api: {bodyParser: false}
}