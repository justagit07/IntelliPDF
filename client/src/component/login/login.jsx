import React from 'react'

import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
  return (
    <div className='h-full  flex justify-center items-center '>
           <div className='w-[300px]'>
                  <p className=' font-semibold  text-center'> IntelliPDF</p>
                   <div className='mt-8  font-semibold text-xl'>Welcome back!</div>
                   <div className='mt-4 text-neutral-500 text-md'>Sign in continue.</div>
                   
                <form className='mt-8 ' action="">

                     <p className='font-semibold font-thin '>Email</p>
                    <input type="text" className='w-[300px]   mb-6 border-2 border-neutral-400 h-10 rounded-lg' />
                     <p className='font-semibold font-thin'>Password</p>
                    <input type="text" className='w-[300px] border-2 border-neutral-400 h-10 rounded-lg' />
                     <button className='w-[300px]  text-white bg-blue-500 h-10 rounded-lg mt-2'> Login</button>
                </form>
                 
                <p className='mt-4 text-sm  text-center'>No account ? <Link to='/home/pricing' className='text-blue-500'> Create one</Link></p>
           </div>

    </div>
  )
}
