import express from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import cors from 'cors'
import User from './model/user.js'
//importing the routes for the auth
import authroutes from './routes/auth.js'
import mongoose from 'mongoose'
import Vectordb from './model/vector.js'

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import OpenAI from 'openai'




// const openai = new OpenAI();
const app= express()
app.use(express.json())
app.use(bodyParser.json({limit: "30mb", extended:true}))

mongoose.connect(process.env.MONGODB).then(()=>{
  console.log('your mongoose .connected');
}).catch((e)=>{console.log('unable to connect with the mongodb ');
})
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


let vectorStore

app.post('/upload', upload.single('pdf'), async (req,res)=>
{
    console.log(req.body);
    const _id= req.body.userID
    
    const { path,originalname, size} = req.file;
    
    const user= await User.findById({_id})
    console.log('this is the req.file meta data', req.file)
    const x= await Vectordb.create({title:originalname, size, path})
    const addingpdfid= await  user.updateOne({$push: {pdfupload:x._id}})
    
    console.log('this is the updated user', addingpdfid)
    res.status(200).json({
      createdAt:x.createdAt,
      name:x.title,
      path:x.path,
      _id:x._id
    })
  })
  
  app.use('/auth', authroutes)




  
  app.post('/pdfview', async function vectorformation(req,res)
  {  const {filename}= req.body
      console.log('this is the filename', filename)
const loader = new PDFLoader(`./public/${filename}`);   
const docs = await loader.load();
const Totalpages= docs.length

console.log('this is the doc ', docs)
console.log('');
console.log('');
console.log('');
console.log('');
console.log('');
console.log('');
console.log('totalnuber of the pages', Totalpages);


const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 20,
});

const docOutput = await splitter.splitDocuments(docs);

const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPEN_AI_SECRET, // In Node.js defaults to process.env.OPENAI_API_KEY
    batchSize: 512, // Default value if omitted is 512. Max is 2048
    modelName: "text-embedding-3-large",
});


const pinecone = new Pinecone({ apiKey: process.env.PINECONE});



const pineconeIndex = pinecone.Index("intellipdf");
 vectorStore= await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex,
    maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
  });

  console.log('vectoreStore is here bro ', vectorStore);
  

})


app.post('/question', async function(req, res)
{
   const {question}= req.body
  const results = await vectorStore.similaritySearch(question, 1);
  console.log(results);
   console.log('hnij n');

  const alldata= results.map((r) => r.pageContent).join('\n\n')
  console.log(alldata)


const openai = new OpenAI({
    apiKey:process.env.OPEN_AI_SECRET ,
  })

  const prompt = `Based on this context: ${alldata} \n\n Query: ${question} \n\n Answer:`
  console.log(prompt,'this is the prompt')
  const response = await  openai.chat.completions.create({
    model: 'gpt-3.5-turbo-16k',
    stream: false,
    temperature: 0.5,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  res.status(200).json({answer: response?.choices[0]?.message.content})
  console.log('answer...........', response?.choices[0]?.message.content)
})
