const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs'); 
require('dotenv').config();
const bodyParser = require('body-parser'); // Import bodyParser
const OpenAI = require('openai'); // Import OpenAI
const cors = require('cors')


//importing the routes for the auth
const authroutes = require('./routes/auth.js')

const mongoose= require('mongoose')

const { MongoClient } = require('mongodb');
const Vectordb= require('./model/vector.js')


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
    
    const { path,originalname} = req.file;
    
    console.log('this is the req.file meta data', req.file)
    const dataBuffer = fs.readFileSync(path);
    console.log('this si the databuffer', dataBuffer)
    console.log('this is the file', path);

        const pdfData = await pdfParse(dataBuffer);
       const text = pdfData.text;
        console.log('this is the text sending to the backend', text)

  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });
  console.log('this is the embeddidng', embedding);
   const x= await Vectordb.create({title:originalname, description:text, vector:embedding.data[0].embedding})
   console.log(x)
  res.status(200).json({
    createdAt:x.createdAt,
    updatedAt:x.updatedAt,
    name:x.title
  })
})





// this route is created for just checking whether open ai is able to genrate the answer to the asked question or not
app.post('/question', async(req,res)=> 
{ 

  try{
           console.log(req.body, 'this is the req.body')
         const{param}=req.body
         console.log('this is your param', param)
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": param
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log('hnji response aa gaya h ')
    console.log('yeh h respone', response);
    
    res.send(response)
  }
  catch(e)
  {
    console.log(e)
    res.send(500)
  }

});



app.post('/answer', async(req,res)=> 
{ 


         console.log('this si the req.body', req.body)
         const {question}= req.body

  const embeddings = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: question,
    encoding_format: "float",
  });
  console.log('this is the embedding bro', embeddings.data[0].embedding)
  const embedding=embeddings.data[0].embedding;
  
 async function findSimilarDocuments(embedding) {
    try {
      const url = 'mongodb+srv://droptelegram:neeraj123@cluster0.6q8h6uw.mongodb.net/vector' // Replace with your MongoDB url.
      const client = new MongoClient(url);
      await client.connect();
      
      const db =  client.db('vector'); // Replace with your database name.
      const collection = db.collection('vectordbs'); // Rep

      const documents = await collection.aggregate([
          {
            $search: {
              knnBeta: {
                vector: embedding,
                path: 'vector',
                k: 5,
              },
            },
          },
          {
            $project: {
              description: 1,
              score: { $meta: 'searchScore' },
            },
          },
        ])
        .toArray()

      return documents
    } catch (err) {
      console.error(err)
    }
  }

  const similarDocuments = await findSimilarDocuments(embedding)

  console.log('similarDocuments: ', similarDocuments)
  const highestScoreDoc = similarDocuments.reduce((highest, current) => {
    return highest.score > current.score ? highest : current
  })

  console.log('highestScoreDoc', highestScoreDoc)

  const prompt = `Based on this context: ${highestScoreDoc.description} \n\n Query: ${question} \n\n Answer:`
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

  console.log('final answer from the chatgpt are finally ', response?.choices[0]?.message.content)
 
})

//  auth routes login and the register

app.use('/auth', authroutes)