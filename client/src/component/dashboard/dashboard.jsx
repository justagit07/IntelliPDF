import React, { useState } from 'react'
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import { useEffect } from 'react';
import date from 'date-and-time'
import Dashnav from '../dashnav';
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom';
import { setPdf ,setcurrentpdf,changeuserpdfupload, setuserpdfupload, setupload} from '../../states'
import { useDispatch, useSelector } from 'react-redux'

export default function Dashboard() {
           
         const dispatch= useDispatch()
         const userId=useSelector(state=> state.user._id)
         const plan=useSelector(state=> state.user.subscription)
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

             dispatch(setupload(response.data.final)) 
             console.log('this is the response', response)
             console.log('this is the response', response.data)

              dispatch(setuserpdfupload(response.data._id))

  
             if(response)
             {
              setshowupload(false)
             }
            
             setdata([...data,{
              _id:response.data._id,
              title:response.data.name,
              createdAt:response.data.createdAt,
              updatedAt:response.data.updatedAt
             }])
             if(plan !=='premium')
             {
               setcount(()=>count+1)
             }
          } 
          catch (error) {
            console.log("this is the error", error.response)
            
          }

        }


        // delete button work
        const handledelete = async function (e)
        {


                  console.log('button is pressed')
                 const others= data.filter((er)=> er._id != e._id )
              console.log('this is the others', others)

              console.log('this is the selected pdf id', e._id)
              console.log('this is the userId', userId)

             const pdfId= e._id
             if(pdfId && userId)
             {

            try {

                console.log('yeh h wo jisper click kra h ',pdfId)
                const response=  await axios.post('http://localhost:3000/deletepdf', {pdfId:e._id, userId})
                console.log('this is the response', response)
                dispatch(setupload(response.data.final))
                /////////////////////isko krna h ab/////////////////

                 dispatch(changeuserpdfupload(response.data.allupload))

                setcount(count-1)
                setdata(others)
  
            } 
            catch (error) {
              console.log('this is the error', error)
            }

             }
             else
             {
              console.log(" pdfId e.Id is not fount ")
             }
              
          
            

        }



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


         { date && data.length!==0 ?    <div className='ml-10 w-[90vw]  justify-center
          h-[60vh] flex  flex-wrap gap-9'>
          
          { data.map((e)=>
         {
              return(
                <>
                <div className='bg-white w-[300px]   relative rounded-lg   h-24 p-3  '>

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
                        'dd MMM yyyy '
                        )}
                  </p>
                  <p className='bg-red-50 rounded-sm w-8 mb-8' >
                    <button onClick={()=>handledelete(e)} className=' w-28'>

                   <img src="../../src/assets/delete.svg" className='fill-blue-500 invert h-6' alt="itsdelete" />
                    </button>
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
