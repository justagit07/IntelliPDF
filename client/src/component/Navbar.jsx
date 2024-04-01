import React from 'react'
import {Link} from 'react-router-dom'
import Pricing from './pricing'
export default function Navbar() {
  return (
     <nav className='z-10 sticky flex font-medium align-middle items-center justify-around gap-16 top-0 w-full px-[5vw] py-5 h-[50px] border-b border-grey bg-white'>
        <div className='font'>
            IntelliPDF
        </div>

        <div className=' flex  justify-between font-medium  text-center align-middle md:justify-between  w-[300px]'>
        <div class="hidden content-center md:block">

            <button className=' text-center align-middle items-center'> <Link to='/home/pricing'>Pricing</Link></button>
</div>
            <button > <Link to='/auth'> Sign in</Link></button>

            <div className='p-1 rounded-md bg-blue-600 w-[100px]'>
            <button className='  text-white '> 
            <Link to='/register'>
            Get Started 
            </Link>
            </button>

            </div>
        </div>

     </nav>
  )
}
