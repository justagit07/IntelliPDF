import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
export default function Chatbox() {

      const currentpdf= useSelector(state=> state.currentpdf)
      const [data, setdata]=useState([])
      const [question, setquestion]=useState()

      const handlesubmit =  async function(e)
      {
        e.preventDefault()
       try {
        const message= e.target.data.value
        const response=  await axios.post('http://localhost:3000/question', {question:message})
         const msg= response.data.answer
        setdata([...data , msg])
        setquestion('')
 
       } catch (error) {
        console.log('this is the error', error)
       }
      }
  return (
    <div>

      <div className='h-[82vh] w-[39vw] content-end mb-2'>
           
             {data.length>0 ? 
              <div>
              {data.map((e)=>
             {
              return (
                <div className='m-3 bg-neutral-200 rounded-3xl p-3'>
                  {e}
                </div>

              )


             })} </div>:''}


      </div>

      <div className='bg-neutral-200 rounded-lg p-2 mr-2 h-[10vh] '>

        <form onSubmit={handlesubmit}>
            <div className=' h-[8vh] rounded-xl flex justify-between bg-white'>
              <input type="text" placeholder='Enter your question... ' value={question}  onChange={(e)=> setquestion(e.target.value)} name='data' className='border-none m-2 w-[32vw] h-10' />

              <div className='bg-blue-600 h-10 w-10 mr-4 mt-2 p-1  rounded-lg'>
                <button type='submit'>

              <img src="../src/assets/share.svg " className='invert w-8 h-8 ' alt="" />
                </button>

              </div>
            </div>
        </form>
      </div>
       
    </div>
  )
}
