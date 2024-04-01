import React from 'react'
import axios from 'axios'
import { useState } from 'react';


export default function Uploadpdf() {

        const [file, setFile] = useState(null);
        const [question, setquestion]=useState()
      
        const handleFileChange = (e) => {
          setFile(e.target.files[0]);
          console.log('this is the file', file)
        };


        const handleUpload = async () => {
            const formData = new FormData();
            console.log('this is the file', file)
            console.log('this is the file which is save in the form data')
            formData.append('pdf', file);
            console.log(formData,' this  is the form dat')
        
            try {
              const response = await axios.post('http://localhost:3000/', formData);
               console.log('all is ok now')
               console.log('this is done', )
               console.log('this is the respone', response)
               console.log('This is the response.data bro', response.data)
               
            } catch (error) {
              console.error('Error uploading PDF:', error);
            }
        }

        const handleclick= async()=>
        {
          try {
            const response = await axios.post('http://localhost:3000/answer', {question: question});
             
          } catch (error) {
            console.error('Error uploading PDF:', error);
          }

        }
        



  return (
    <div>
        <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>


    <div>
            <div className='text-lg m-8'>
              Asked a question 
              <div className='p-5'>

              <input type="text" onChange={(e)=>{setquestion(e.target.value)}} className='border-2 w-96' placeholder='enter the question '/>
               <button className='bg-blue-600 text-white rounded-lg mx-8' onClick={handleclick}>
                search question 
               </button>
              </div>


            </div>
    </div>
    </div>
  )
}
