import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
   
  const {register, handleSubmit, reset}= useForm()

     const submit= async(data)=>
     {
        try 
        {
          console.log('this is the data',data )
          const response=  await axios.get('http://localhost:3000/auth/login', data )
          console.log('this is the response')
        } 
        catch (error) {
          console.log('something went wrong')
          console.log('this is the error', error)
          
        }
     }

  return (
    <div className='h-full  flex justify-center items-center '>
           <div className='w-[300px]'>
                  <p className=' font-semibold  text-center'> IntelliPDF</p>
                   <div className='mt-8  font-semibold text-xl'>Welcome back!</div>
                   <div className='mt-4 text-neutral-500 text-md'>Sign in continue.</div>
                   
                <form className='mt-8 ' onSubmit={handleSubmit(submit)}>

                     <p className='font-semibold font-thin '>Email</p>
                    <input type="text"  {...register ("email")} className='w-[300px]   mb-6 border-2 border-neutral-400 h-10 rounded-lg' />
                     <p className='font-semibold font-thin'>Password</p>
                    <input type="text" {...register ("password")} className='w-[300px]  mb-4 border-2 border-neutral-400 h-10 rounded-lg' />
                     <button type='submit' className='w-[300px]  text-white bg-blue-500 h-10 rounded-lg mt-2'> Login</button>
                </form>
                 
                <p className='mt-4 text-sm  text-center'>No account ? <Link to='/home/pricing' className='text-blue-500'> Create one</Link></p>
           </div>

    </div>
  )
}
