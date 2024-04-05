import React from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Subsciption() {
    const {id}= useParams()
    const navigate= useNavigate()

    const handleclick= async function()
    {
       try {
         console.log('ok then ')
         console.log('this is our userId', id)
         const response = await axios.post('http://localhost:3000/stripe-session', {userId:id})
          console.log('this is the response', response.data)

          navigate('/login')

       } 
       catch (error)  
       {
       
         console.log('this is the error', error)
        
       }
    }
  return (
     <div className='flex justify-center items-center h-full'>
        <div className=' w-[50vw] p-4 h-[50vh]'>
               <div className=' flex items-center w-full justify-center'>
                <img src="../src/assets/payment.svg"  className='w-16 ' alt="ok" />
               </div>
               <div className='text-center m-4 font-semibold text-3xl'>
                Payment Sucessful!
               </div>
               <div className='text-center m-4 text-xl'>
                 Your payment succesfully completed.
               </div>
               <div className='flex justify-center  mt-12 '>

               <button  className='w-full h-12 bg-blue-500 text-white font-semibold text-xl rounded-md  w-[30vw]' onClick={handleclick}>
                 Continue
              </button>
               </div>
        </div>


        
      </div>

  )
}
