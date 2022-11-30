
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Event = ({setEventBtn}) => {

  
  const param = useParams();

  useEffect(() => {
    setEventBtn(true);
  }, [])
  
  
  return (
    <div>
      <div className='flex pb-4'>

        <div className=' px-4 pt-4  col-span-2 w-40'>
          <div>
              <p>새모임</p>
              <p>지난모임</p>
          </div>
        </div>

        <div className=' pt-4 col-span-10 flex flex-col gap-8'>
          <div className='flex flex-wrap  gap-4 sm:col-span-3 xl:col-span-3'>
            <div className=' w-52 col-span-3'>
                <div className=' bg-gray-400'>
                  <p>스프링 JPA실습</p>
                </div>
                <div className=''>
                  <p> 토요일 오전 10시</p>
                </div>
                <div className=''>
                  <p>6명 모집중 (5명 남음)</p>
                </div>
            </div>
            <div className=' w-52 col-span-3'>
                <div className=' bg-gray-400'>
                  <p>스프링 JPA실습</p>
                </div>
                <div className=''>
                  <p> 토요일 오전 10시</p>
                </div>
                <div className=''>
                  <p>6명 모집중 (5명 남음)</p>
                </div>
            </div>
            <div className=' w-52 col-span-3'>
                <div className=' bg-gray-400'>
                  <p>스프링 JPA실습</p>
                </div>
                <div className=''>
                  <p> 토요일 오전 10시</p>
                </div>
                <div className=''>
                  <p>6명 모집중 (5명 남음)</p>
                </div>
            </div>
            <div className=' w-52 col-span-3'>
                <div className=' bg-gray-400'>
                  <p>스프링 JPA실습</p>
                </div>
                <div className=''>
                  <p> 토요일 오전 10시</p>
                </div>
                <div className=''>
                  <p>6명 모집중 (5명 남음)</p>
                </div>
            </div>

            <div className=' w-52 col-span-3'>
                <div className=' bg-gray-400'>
                  <p>스프링 JPA실습</p>
                </div>
                <div className=''>
                  <p> 토요일 오전 10시</p>
                </div>
                <div className=''>
                  <p>6명 모집중 (5명 남음)</p>
                </div>
            </div>

            </div>
          
          <div className='pr-20 mr-20 '>
            <div className=" col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
              <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">지난 모임</h2>
              </header>
              <div className="p-3">
              <div>
             
              <ul className="my-1">
                {/* Item */}
                <li className="flex px-2">
                  <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                    <svg className="w-9 h-9 fill-current text-indigo-50" viewBox="0 0 36 36">
                      <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                    </svg>
                  </div>
                  <div className="grow flex items-center border-b border-slate-100 text-sm py-2">
                    <div className="grow flex justify-between">
                      <div className="self-center"><a className="font-medium text-slate-800 hover:text-slate-900" href="#0">Nick Mark</a> mentioned <a className="font-medium text-slate-800" href="#0">Sara Smith</a> in a new post</div>
                      <div className="shrink-0 self-end ml-2">
                        <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">View<span className="hidden sm:inline"> -&gt;</span></a>
                      </div>
                    </div>
                  </div>
                </li>
               
              
              </ul>
            </div> 
            </div>
            </div>


          </div>
        </div>

      </div>
    </div>
  )
}

export default Event