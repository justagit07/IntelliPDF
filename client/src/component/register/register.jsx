import React from 'react'
import {Link , useNavigate} from 'react-router-dom'

export default function Register() {
  return (
    <div className='h-full  flex justify-center items-center '>
    <div className='w-[450px]'>
           <p className=' font-semibold  text-center'> IntelliPDF</p>
            <div className='mt-8  font-semibold text-xl'>Create an account</div>

            
         <form className='mt-8 ' action="">

            <div  >
                <div className='inline-block mr-4'>
            <p className='font-semibold font-thin '>First name</p>
             <input type="text" className='w-[200px]   mb-6 border-2 border-neutral-400 h-10 rounded-lg' />

                </div>

            <div className='inline-block'>

              <p className='font-semibold font-thin '>Last name</p>
             <input type="text" className='w-[200px]   mb-6 border-2 border-neutral-400 h-10 rounded-lg' />
            </div>
            </div>

              <p className='font-semibold font-thin '>Email</p>
             <input type="text" className='w-[420px]   mb-6 border-2 border-neutral-400 h-10 rounded-lg' />
              <p className='font-semibold font-thin'>Password</p>
             <input type="text" className='w-[420px] border-2 border-neutral-400 h-10 rounded-lg' />

              <button className='w-[300px] ml-14 items-center text-white bg-blue-500 h-10 rounded-lg mt-2'> Sign up</button>
         </form>
          
         <p className='mt-4 text-sm  text-center'>Already have account ? <Link to='/register' className='text-blue-500'> Sign in </Link></p>
    </div>

</div>
  )
}
