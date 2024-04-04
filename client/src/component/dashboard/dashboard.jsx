import React, { useState } from 'react'
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import { useEffect } from 'react';
import date from 'date-and-time'
import Dashnav from '../dashnav';
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom';
import { setPdf , setuser,setcurrentpdf, setuserpdfupload} from '../../states'
import { useDispatch, useSelector } from 'react-redux'

export default function Dashboard() {
           
         const dispatch= useDispatch()
         const userId=useSelector(state=> state.user._id)
         const Alreadyuploads= useSelector(state=> state.uploads)
         const [count , setcount]= useState(Alreadyuploads.length)
         console.log('this is the user who are uploading things', userId)

         
       const navigate= useNavigate()
        const[data,setdata]=useState(Alreadyuploads)
        const [showupload, setshowupload]= useState(false)

        const onDrop = async(acceptedFiles) => {

          try {
            const formData = new FormData();
            formData.append('pdf', acceptedFiles[0]);
            formData.append('userID', userId);
          
                console.log('yeh kaha h bhaishab')
              console.log('thisis the form data', formData)
              console.log('thisis the form data', acceptedFiles[0])
  
            console.log(acceptedFiles);
            const response=  await axios.post('http://localhost:3000/upload', formData)
            
             dispatch(setPdf(response.data))
             console.log('this is the response', response)
             console.log('this is the response', response.data)

              dispatch(setuserpdfupload(response.data._id))

  
             if(response)
             {
              setshowupload(false)
             }
            
             setdata([...data,{
              title:response.data.name,
              createdAt:response.data.createdAt,
              updatedAt:response.data.updatedAt
             }])
             setcount(()=>count+1)
          } 
          catch (error) {
            console.log("this is the error", error.response)
            
          }

        }

        useEffect(()=>{
          console.log('this is the data', data)
        },[data])
        const {getRootProps, getInputProps} = useDropzone({onDrop});

       const handleclick=  async function(e)
       {
      try {
          console.log('this is the click pdf', e.title)
          const res =  axios.post('http://localhost:3000/pdfview',  {filename:e.title})
          dispatch(setcurrentpdf(e))
          navigate('/main')
      } 
      catch (error) 
      {
        console.log('this is the error', error)
        
      }
       }





  return (
    <>

    <div className='h-full   bg-neutral-100'>

        <Dashnav/>
     
     <div className='  w-full  items-center  content-center '>
      <div className='m-12 border-b-2 p-4 flex justify-around'>
         <p className='text-4xl font-bold'>My Files</p>
         { count<6?
         <div className='p-2 rounded-md bg-blue-600 w-[100px]'>
            <button className=' text-center align-middle content-center text-white ' onClick={() => setshowupload(true)}> 
             Add PDF
            </button>
            
            </div>  :' '}

      </div>

      {showupload?  
      <div {...getRootProps()} className='dropzone w-[50vw] h-[30vh] p-3 relative left-[23vw] mb-8  rounded-lg bg-white '>

        <div className='w-[48vw] h-[26vh]   content-center   mt-1 rounded-lg border-2 border-dashed '>
             <div className='flex justify-center my-3' >
      <input {...getInputProps()} />
      
             <img src="../../src/assets/pdfs.svg"    alt="hnji" />
             </div>

             <p className='text-center'>Drag and drop single pdf here</p>
            <div className='items-center content-center  my-3 flex justify-center'>

       <button className='flex justify-center items-center content-center w-36 h-10 rounded-lg bg-[#2563EB] '>
           <i className="fi fi-rr-file-pdf invert  m-2" ></i>
         <div className=' font-semibold items-center text-white text-center '> 

         Upload Files

             </div>
             </button>
              </div>
              </div>


        
         </div>:''}


         { date && data.length!==0 ?    <div className='ml-10 w-[90vw]   h-[60vh] flex  flex-wrap gap-9'>
          
          { data.map((e)=>
         {
              return(
                <>
                <div className='bg-white w-[250px]  relative rounded-lg  h-24 p-3  '>

                  <div className='flex items-center gap-3 ml-2 p-1  border-b-2'   onClick={()=>handleclick(e)}>
                    <div>
                     <img src="../../src/assets/pdf.png" className='w-9 h-9' alt="" />
                    </div>
                    <p>{e.title}</p>
                  </div>

                  <div className='flex ml-3 mt-3 items-cente gap-12 '>
                  <p>
                      ➕
                      {format(
                        new Date(e.createdAt),
                        'MMM yyyy'
                        )}
                  </p>
                  <p>
                   <img src="../../src/assets/delete.svg" alt="itsdelete" />
                  </p>
                  </div>
                </div>
                </>
              )
              
              
              
            })
          }</div>:
         <div className='mt-16 flex flex-col items-center gap-2'>
         <h3 className='font-semibold text-xl'>
           Pretty empty around here
         </h3>
         <p>Let&apos;s upload your first PDF.</p>
       </div>
        }
            


     </div>
    </div>

    </>
  )
}
