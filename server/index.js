import express from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import OpenAI from 'openai'
import cors from 'cors'
import fs from 'fs'
import User from './model/user.js'

//importing the routes for the auth
import authroutes from './routes/auth.js'
import mongoose from 'mongoose'
import Vectordb from './model/vector.js'

// const openai = new OpenAI();
const app= express()
app.use(express.json())
app.use(bodyParser.json({limit: "30mb", extended:true}))



mongoose.connect(process.env.MONGODB).then(()=>{
  console.log('your mongoose .connected');
  
}).catch((e)=>{console.log('unable to connect with the mongodb ');
})

// creating the Openai instance for the respnse data

const openai = new OpenAI({
    apiKey:process.env.OPEN_AI_SECRET ,
  });

  app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
        methods:["PUT", "DELETE", "POST", "GET", "PATCH"]
    }
))
  


const storage= multer.diskStorage(
    {
        destination: (req,file,cb)=>
        {
         cb(null, './public')
        },
        filename:(req,file, cb)=>
        {
            cb(null, file.originalname)
        }
     
    
    }); 

const upload = multer({storage})

app.listen(3000, ()=>{
    console.log('your server is running at the http://localhost:3000'); 
})




app.post('/upload', upload.single('pdf'), async (req,res)=>
{
    console.log(req.body);
    const _id= req.body.userID
    
    const { path,originalname} = req.file;
    const user= await User.findById({_id})
    console.log('this is the req.file meta data', req.file)
   const x= await Vectordb.create({title:originalname})
   console.log(x)
   const addingpdfid= await  user.updateOne({$push: {pdfupload:x._id}})

   console.log('this is the updated user', addingpdfid)
  res.status(200).json({
    createdAt:x.createdAt,
    updatedAt:x.updatedAt,
    name:x.title,
    _id:x._id
  })
})




app.use('/auth', authroutes)