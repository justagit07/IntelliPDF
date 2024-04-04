
import { Document, Page } from 'react-pdf';
import { useState, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector'
import {
    ChevronDown,
    ChevronUp,
    Loader2,
    RotateCw,
    Search,
  } from 'lucide-react'

import { useForm } from 'react-hook-form'
import SimpleBar from 'simplebar-react'
import { pdfjs } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'


import { useSelector } from 'react-redux'



function Pdfcom() {
 

  const pdf= useSelector(state=>state.currentpdf)
  console.log('this is the current pdf running', pdf)
  const pdftitle= pdf.title
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);


  function onDocumentLoadSuccess({ numPages }){
    console.log('this is the numpages', numPages)
    setNumPages(numPages);
  }

  const { width, ref } = useResizeDetector()
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [renderedScale, setRenderedScale] = useState(null)
  const isLoading = renderedScale !== scale
  return (

<>
    

    <div className='flex-1 w-[60vw] border-2 mt-1  max-h-screen'>
    <SimpleBar
      autoHide={false}
      className='max-h-[calc(100vh-11vh)]'>
      <div ref={ref}>
        <Document
          loading={
              <div className='flex justify-center'>
              <Loader2 className='my-24 h-6 w-6 animate-spin' />
            </div>
          }
                                                             
          onLoadSuccess={({ numPages }) =>
          setNumPages(numPages) 

        }
        file={`/@fs/Users/neerajrawat/pdf-project/server/public/${pdftitle}`}



      className='max-h-full'>


          <Page

width={width ? width : 1}
pageNumber={pageNumber}
scale={1}
rotate={rotation}
key={'@' + scale}
loading={
    <div className='flex justify-center'>
                <Loader2 className='my-24 h-6 w-6 animate-spin' />
              </div>
            }
            onRenderSuccess={() =>
                setRenderedScale(scale)
            }
            />
        </Document>
      </div>
    </SimpleBar>
      <div className='flex justify-between px-8 text-[10px]  md:text-lg'>
      
      <div className='w-28 pl-1  rounded-lg flex gap-1 bg-neutral-300  text-md font-thin '>
        <img src="../../src/assets/back.svg" className='invert' alt="" />

      <button
        onClick={() => {
            if(pageNumber>1)
            {
                
                setPageNumber(pageNumber - 1);
            }
        }}
        >
        Previous
      </button>
      </div>
      <p className='text-sm align-middle text-center content-center'>
        Page {pageNumber} of {numPages}
      </p>
      <div className='w-20 pl-2  rounded-lg flex gap-1 bg-neutral-300  text-md font-thin '>
      <button
        onClick={() => {
            if(pageNumber<numPages)
            {
                
                setPageNumber(pageNumber + 1);
            }
        }}
        >
          Next
      </button>
          <img src="../../src/assets/next.svg" className='invert' alt="" />
          </div>
      <div >

      <button


      onClick={() => setRotation((prev) => prev + 90)}
       aria-label='rotate 90 degrees'>
        <div className='flex'>
        <img src="../../src/assets/rotate.svg" alt="" />


        </div>

          </button>
        </div>
            </div>
  </div>
   </>
  );
}
export default Pdfcom;

