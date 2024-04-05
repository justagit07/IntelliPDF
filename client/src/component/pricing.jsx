import React from 'react'
import Navbar from './Navbar'
import {useParams} from 'react-router-dom'
import {Link, useNavigate} from 'react-router-dom'
import axios  from 'axios'
export default function Pricing() {
      const navigate= useNavigate()
      const {id}= useParams()
      console.log('this is the register user id', id)
    const handlefree= function ()
    {
      navigate('/login')
    }
    const handleclick= async ()=>
    {

        const response=  await axios.post('http://localhost:3000/create-checkout-session', {userId: id})
        console.log('response from axios is ', response.data.url)
        window.location = response.data.url
    }




  return (
    <div className='bg-neutral-100 h-screen'>
      <Navbar/>
      <div  >
        <div className='font-bold text-5xl mt-8  mb-6 text-center'>
            Pricing
        </div>
        <div className='text-md text-neutral-500'>
            <p className='text-center'>whether your're just trying out our services or need more,</p>
            <p className='text-center'>we've got you covered</p>
        </div>
      </div>

      <div className=' m-4 md:flex  md:gap-8 md:justify-center mt-4 ' >



      <div className=' shadow-lg border-neutral-100  rounded-xl content-center  bg-white w-72 '>
        <p className='text-center font-semibold text-2xl my-3'>Free</p>
        <p className=' text-center text-neutral-400 my-3 text-sm'>For small size projects.</p>

          <p className='font-bold text-4xl h-12 align-middle content-center text-center my-3'>₹ 0.00</p>
          <p className=' text-center text-neutral-400 my-3 text-sm'>per month</p>
          <div className=' bg-neutral-100 border-y-2 h-12 my-4 border-neutral-200 text-center align-middle content-center text-xs font-bold '>
           10 PDFs/month included
          </div>
          <div className='mb-2 '>
            <div className='flex  gap-3 m-3 text-sm'> <img src="../../src/assets/tick.svg" alt="" />    5 pages per PDF  </div>
            <div className='flex gap-3 m-3 text-sm'> <img src="../../src/assets/tick.svg" alt="" />    3 MB file size limit  </div>
            <div className='flex gap-3 m-3 text-sm'> <img src="../../src/assets/tick.svg" alt="" />    Mobile-friendly interface  </div>
            <div className='flex gap-3 m-3  text-gray-500 text-sm'> <img src="../../src/assets/minus.svg" alt="" />   High-quality responses  </div>
            <div className='flex gap-3 m-3  text-gray-500  text-sm'> <img src="../../src/assets/minus.svg" alt="" />   priority support  </div>
          </div>
<div className='items-center content-center m-4  flex justify-center'>
    
          <button className='flex justify-center  items-center ' >
            <div className='flex  bg-neutral-300 w-[200px] gap-2 rounded-md h-10 justify-center items-center ' onClick={ handlefree}> 
               Signup
            <img src="../../src/assets/right.svg" className='fill-black' alt="" />
            </div>
          </button>
      </div>
</div>



<div className=' shadow-lg border-2 border-blue-400 rounded-xl mt-10 md:mt-0 content-center  bg-white w-72 '>
        <p className='text-center font-semibold text-2xl my-3'>Free</p>
        <p className=' text-center text-neutral-400 my-3 text-sm'>For small size projects.</p>

          <p className='font-bold text-4xl h-12 align-middle content-center text-center my-3'>₹ 199</p>
          <p className=' text-center text-neutral-400 my-3 text-sm'>per month</p>
          <div className=' bg-neutral-100 border-y-2 h-12 my-4 border-neutral-200 text-center align-middle content-center text-xs font-bold '>
           50 PDFs/month included
          </div>
          <div className='mb-2 '>
            <div className='flex  gap-3 m-3 text-sm'> <img src="../../src/assets/tick.svg" alt="" />    25 pages per PDF  </div>
            <div className='flex gap-3 m-3 text-sm'> <img src="../../src/assets/tick.svg" alt="" />    16 MB file size limit  </div>
            <div className='flex gap-3 m-3 text-sm'> <img src="../../src/assets/tick.svg" alt="" />    Mobile-friendly interface  </div>
            <div className='flex gap-3 m-3  text-gray-500 text-sm'> <img src="../../src/assets/tick.svg" alt="" />   High-quality responses  </div>
            <div className='flex gap-3 m-3  text-gray-500  text-sm'> <img src="../../src/assets/tick.svg" alt="" />   priority support  </div>
          </div>
<div className='items-center content-center m-4  flex justify-center'>
    
          <button className='flex justify-center   items-center ' onClick={handleclick} >
            <div className='flex  bg-blue-600 w-[200px] gap-2 text-white rounded-md h-10 justify-center items-center '> 
             Sign up
            <img src="../../src/assets/right.svg" className=' invert' alt="" />
            </div>
          </button>
      </div>
</div>





      </div>
    </div>
  )
}
