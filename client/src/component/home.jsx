
import React from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'

export default function Home() {
  return (
    <div>
    <Navbar/>
<div className='mb-12 mt-28 sm:mt-28 flex flex-col items-center justify-center text-center'>

    <div className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'>
          <p className='text-sm font-semibold text-gray-700'>
            IntelliPDF is now public!
          </p>
        </div>
        <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
          Chat with your{' '}
          <span className='text-blue-600'>documents</span>{' '}
          in seconds.
        </h1>
        <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
          IntelliPDF allows you to have conversations with any
          PDF document. Simply upload your file and start
          asking questions right away.
        </p>

</div>
        <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>

          <div>
            <div className='mx-auto max-w-4xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                 <div className=' rounded-lg  p-4 border-2 border-dashed border-purple-200 bg-[#f2ebfb]'>
                     <div className='flex  justify-center'>
 
                            
                            <Link to='/auth'>
                            <img src="../../src/assets/addfile.svg" className='fill-rose-500 '    alt='svg of file' />
                            </Link>
                     </div>
                      <div className='  my-3 font-semibold text-center'>
                      Click to Upload or Drop PDF/DOC here
                      </div>
                      <div className='  my-3 text-neutral-600 text-center'>
                      Upload up to 20 files at once
                      </div>
                      <div className='items-center content-center  my-3 flex justify-center'>

                     <button className='flex justify-center items-center content-center w-36 h-10 rounded-lg bg-[#2563EB] '>
                     <i className="fi fi-rr-file-pdf invert  m-2" ></i>
                      <div className=' font-semibold items-center text-white text-center '> 
                      <Link to='/auth'>
                      Upload Files
                      </Link>
                      </div>
                     </button>
                      </div>

                 </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
      
    </div>
  )
}
