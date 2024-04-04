import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from 'dotenv'
dotenv.config()
import OpenAI from 'openai'
import { PineconeStore } from "@langchain/pinecone";



const loader = new PDFLoader("./public/electricity.pdf");

const docs = await loader.load();

const pageamt= docs.length



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
console.log('p', process.env.PINECONE);


const pineconeIndex = pinecone.Index("intellipdf");
const vectorStore= await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex,
    maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
  });

  const results = await vectorStore.similaritySearch("current SI unit", 1);
  console.log(results);
   console.log('hnij n');

  const alldata= results.map((r) => r.pageContent).join('\n\n')
  console.log(alldata)


const openai = new OpenAI({
    apiKey:process.env.OPEN_AI_SECRET ,
  });

  const question = 'current is measure in which unit ?'


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

  console.log('answer...........', response?.choices[0]?.message.content)






















//    const response = await openai.chat.completions.create(
//     {
//     model: 'gpt-3.5-turbo',
//     temperature: 0,
//     stream: true,
//     messages: [
//       {
//         role: 'system',
//         content:
//           'Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.',
//       },
//       {
//         role: 'user',
//         content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.

  
//        CONTEXT:
//         ${results.map((r) => r.pageContent).join('\n\n')}`
//         }]

//     })
//       console.log('response ' , response);
      
//     // console.log('final answer from the chatgpt are finally ', response?.choices[0]?.message.content)


















// //   console.log(docOutput);
  

