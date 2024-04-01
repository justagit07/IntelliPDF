import React, { useState } from 'react'

export default function Dashboard() {

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

     <div className='  w-full  items-center content-center '>
      <div className='m-12 border-b-2 p-4 flex justify-around'>
         <p className='text-4xl font-bold'>My Files</p>
         <div className='p-2 rounded-md bg-blue-600 w-[100px]'>
            <button className=' text-center align-middle content-center text-white ' onClick={() => setShowDiv(true)}> 
         Upload pdf
            </button>
            
            </div>
            
      </div>
     </div>
    </div>











    </>
  )
}

