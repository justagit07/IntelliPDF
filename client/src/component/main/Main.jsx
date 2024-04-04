import React from 'react'
import Dashnav from '../dashnav'
import Pdfcom from '../pdfrending/pd'
import Chatbox from '../chatbox/chatbox'
export default function Main() {




  return (
    <div>
<Dashnav/>
 
       <div className='flex gap-1'>
      <Pdfcom/>
       <Chatbox/>
       </div>
      
    </div>
  )
}
