import React from 'react'
import Dashboard from './dashboard/dashboard'
import {Link} from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import {logout} from '../states/index'

export default function Dashnav() {
       const check= useSelector(state=> state.user.subscription)

 const dispatch= useDispatch()
 const handleclick= function ()
 {
        dispatch(logout(''))

 }

  return (
    <div>
        <nav className='z-10 sticky flex font-medium align-middle items-center justify-around gap-16 top-0 w-full px-[5vw] py-5 h-[40px] border-b border-grey bg-white'>
        <div className='font'> <Link to='/'>IntelliPDF</Link></div>
        <div className=' flex   gap-4 '>
       <button className=' text-center text-sm ' > <Link to='/dashboard'>Dashboard</Link> </button>
       <i className="fi fi-rr-circle-user"></i>
       {  check==='premium' ? <div className='flex'>
       <img src="./src/assets/king.svg "  />
        <p className='text-sm  content-center'>pro</p>
       </div>: ''}
      

        <button onClick={handleclick}>
        <i class="fi fi-rr-sign-out-alt"></i>
       </button>
        </div>

     </nav>

    </div>
  )
}
