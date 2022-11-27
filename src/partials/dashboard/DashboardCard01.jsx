import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import EditMenu from '../EditMenu';

function DashboardCard01({data}) {

  return (
    <div className="flex flex-col h-60  w-60 sm:col-span-4 xl:col-span-4 bg-white shadow-lg rounded-lg border border-slate-200">
   <div className="px-5 pt-5 rounded">
     <header className="flex justify-between items-start mb-2">
       <p className=' font-bold  text-2xl text-teal-800 '>{data.title}</p>
       <EditMenu className="relative inline-flex">
         <li>
           <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 1</Link>
         </li>
         <li>
           <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 2</Link>
         </li>
         <li>
           <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">Remove</Link>
         </li>
       </EditMenu>
     </header>
     <div className='h-20'>
     <h2 className="  font-semibold text-slate-800 mb-2">{data.shortDescription}</h2>
     </div>
     <div className="flex gap-6 items-start py-2">
      {data.tags.map((value,idx)=>{
        return <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full" key={idx}>{value.title}</div>
      })}
       {/* <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">JAVA</div>
       <div className="text-sm font-semibold text-white px-1.5 bg-teal-500 rounded-full">JAVA</div>
       <div className="text-sm font-semibold text-white px-1.5 bg-blue-500 rounded-full">JAVA</div>
       <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">JAVA</div> */}
     </div>
   </div>

   <div className=" flex text-xs mt-5 mx-2 justify-between font-semibold text-slate-400 uppercase ">
     <div className='mx-4'>
       7명
     </div>
     <div className='mx-4'>
     2일전
     </div>
   </div>

 </div>
);
}

export default DashboardCard01;
