import { useState } from 'react';
import { Document, Page } from 'react-pdf';
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
function Pdfcom() {
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
    

    <div className='flex-1 w-[60vw] border-2 mt-3 max-h-screen'>
    <SimpleBar
      autoHide={false}
      className='max-h-[calc(100vh-7rem)]'>
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
        file='sample.pdf'
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
      <div className='flex justify-between text-[10px]  md:text-lg'>

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
      <p>
        Page {pageNumber} of {numPages}
      </p>
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
      <button
      
      onClick={() => setRotation((prev) => prev + 90)}
      variant='ghost'
      aria-label='rotate 90 degrees'>
                rotate

          </button>
            </div>
  </div>
   </>
  );
}
export default Pdfcom;

