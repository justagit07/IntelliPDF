import React, { useState } from 'react'
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
export default function Dashboard() {

        const onDrop = (acceptedFiles) => {

          console.log(acceptedFiles);

        






        }
        const {getRootProps, getInputProps} = useDropzone({onDrop, accept: '.pdf'});

    const [showDiv, setShowDiv]= useState(false)
  return (
    <>

    <div className='h-full   bg-neutral-100'>

        
       <nav className='z-10 sticky flex font-medium align-middle items-center justify-around gap-16 top-0 w-full px-[5vw] py-5 h-[40px] border-b border-grey bg-white'>
        <div className='font'>  IntelliPDF</div>
        <div className=' flex   gap-4 '>
       <button className=' text-center text-sm '> Dashboard</button>
       <i className="fi fi-rr-circle-user"></i>
        </div>

     </nav>

     <div className='  w-full  items-center  content-center '>
      <div className='m-12 border-b-2 p-4 flex justify-around'>
         <p className='text-4xl font-bold'>My Files</p>
         <div className='p-2 rounded-md bg-blue-600 w-[100px]'>
            <button className=' text-center align-middle content-center text-white ' onClick={() => setShowDiv(true)}> 
             Add PDF
            </button>
            
            </div>      

      </div>
             <div {...getRootProps()} className="dropzone">
      <div className='w-[50vw] h-[30vh] p-3 relative left-[23vw]  rounded-lg bg-white '>

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

        </div>
        
         </div>


     </div>
    </div>

    </>
  )
}
