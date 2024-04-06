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
import deleteroutes from './routes/pdf.js'
import Stripe from 'stripe';


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
    const usera= await  User.findById(_id)
    const allupload= usera.pdfupload
    console.log(`this is the all uploaded pdf id of the  ${usera.firstname} `, allupload)
       
    const detail= await  Promise.all( allupload.map(async(e)=>  await Vectordb.findById({_id:e})))

    
    
    const final = detail.map(({title, _id , createdAt})=> {return {title, _id , createdAt }})
    
    console.log('this is the updated user', addingpdfid)
    res.status(200).json({
      createdAt:x.createdAt,
      name:x.title,
      path:x.path,
      _id:x._id,
      final
    })
    })
    console.log('this is the pdf-project');
    
    app.use('/auth', authroutes)  
   app.post('/pdfview', async function vectorformation(req,res)
   {  const {filename}= req.body
      console.log('this is the filename', filename)
const loader = new PDFLoader(`./public/${filename}`);   
const docs = await loader.load();
const Totalpages= docs.length
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

app.use('/deletepdf', deleteroutes)


const stripe = new Stripe(process.env.STRIPE_SECRET);



app.post("/create-checkout-session", async (req, res) => {
  try {
         
            const {userId}= req.body
            console.log('this is my userid', userId); 



            const session = await stripe.checkout.sessions.create({
              success_url: `http://localhost:5173/sucess/${userId}`,
              cancel_url: `http://localhost:5173/home/pricing/${userId}`,
              line_items: [
                {
                  price: process.env.STRIPE_PRICE_ID,
                  quantity: 1
                }
              ],
              mode: 'subscription',
              customer_email: 'customer@example.com', // Replace with the customer's email
              billing_address_collection: 'required', // Collect billing address
              metadata: {
                userId: userId // Include userId as metadata
              }

            });       
            
          console.log('seesion.id', session.id);
          
    const x= await  User.findByIdAndUpdate(userId , {sessionId:session.id})

    console.log(' will your datdabase is add he session id or not check bor', x);
    res.status(200).json({ url: session.url })
  } catch (e) {
    console.log('error', e);
    
    res.status(500).json({ error: e.message })
  }
})


app.post("/stripe-session", async (req, res) => {


     const { userId } = req.body;
      console.log("userId: ", userId);
      const user= await User.findOne({_id:userId})
     console.log('user of the firse', user);
     const  {sessionId , paid_sub}= user


  if(!sessionId || paid_sub === true) 
  return res.send("fail");

  try {

      const session = await stripe.checkout.sessions.retrieve(user.sessionId);

           
        console.log('this is the about the session');
        console.log('sessoin is', session);
        
        

      // const sessionResult = {
      //   id: 'cs_test_a1lpAti8opdtSIDZQIh9NZ6YhqMMwC0H5wrlwkUEYJc6GXokj2g5WyHkv4',
      //   …
      //   customer: 'cus_PD6t4AmeZrJ8zq',
      //   …
      //   status: 'complete',
      //   …
      //   subscription: 'sub_1OOgfhAikiJrlpwD7EQ5TLea',
      //  …
      // }
    
      // update the user

      
      if (session && session.status === "complete") 
      {
        const x= await User.findByIdAndUpdate(userId, {paid_sub:true ,  customerId:session.customer, 
          subscription:"premium" , subscriptionId:session.subscription})
         return res.send("success");
      } 
      else 
      {
        return res.send("fail");
      }
  } 
  catch (error) {

      console.error("An error occurred while retrieving the Stripe session:", error);
      return res.send("fail");
  }
})

