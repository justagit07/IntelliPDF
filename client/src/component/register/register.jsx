import React from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {useForm}     from 'react-hook-form'
import axios from 'axios'
export default function Register()

{
   
  const {register, handleSubmit, reset , formState:{errors, isSubmitting}}= useForm()




const submit= async(data) =>
{


  console.log('this is the data', data)
      const response=  await axios.post('http://localhost:3000/auth', data)
      console.log('this is the response ', response)
      
}





  return (
    <div className='h-full  flex justify-center items-center '>
    <div className='w-[450px]'>
           <p className=' font-semibold  text-center'> IntelliPDF</p>
            <div className='mt-8  font-semibold text-xl'>Create an account</div>

            
         <form className='mt-8 ' onSubmit={handleSubmit(submit)}>

            <div  >
                <div className='inline-block mr-4'>
            <p className='font-semibold font-thin '>First name</p>
             <input type="text"    {...register ("firstname", {required:true})}    className='w-[200px]   mb-6 border-2 border-neutral-400 h-10 rounded-lg' />

                </div>

            <div className='inline-block'>

              <p className='font-semibold font-thin '>Last name</p>
             <input type="text" {...register ("lastname")}   className='w-[200px]   mb-6 border-2 border-neutral-400 h-10 rounded-lg' />
            </div>
            </div>

              <p className='font-semibold font-thin '>Email</p>
             <input type="text"  {...register ("email", {required:true})}     className='w-[420px]   mb-6 border-2 border-neutral-400 h-10 rounded-lg' />


              <p className='font-semibold font-thin'>Password</p>
             <input type="text"   {...register ("pass", {required:true})}       className='w-[420px] border-2 border-neutral-400 h-10 rounded-lg' />

              <button type='submit' className='w-[300px] ml-14 items-center text-white bg-blue-500 h-10 rounded-lg mt-2'> Sign up</button>
         </form>
          
         <p className='mt-4 text-sm  text-center'>Already have account ? <Link to='/login' className='text-blue-500'> Sign in </Link></p>
    </div>

</div>
  )
}
