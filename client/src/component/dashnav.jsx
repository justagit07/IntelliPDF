import React from 'react'

export default function Dashnav() {
  return (
    <div>
        <nav className='z-10 sticky flex font-medium align-middle items-center justify-around gap-16 top-0 w-full px-[5vw] py-5 h-[40px] border-b border-grey bg-white'>
        <div className='font'>  IntelliPDF</div>
        <div className=' flex   gap-4 '>
       <button className=' text-center text-sm '> Dashboard</button>
       <i className="fi fi-rr-circle-user"></i>
        </div>

     </nav>

    </div>
  )
}
