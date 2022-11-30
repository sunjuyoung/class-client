import React, { useContext, useEffect, useState } from 'react'
import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useParams } from 'react-router-dom';
import AuthContext from '../../../context/AuthProvider';
import axios from '../../../api/axios';

const EventCreate = () => {
    const {auth} = useContext(AuthContext);
    const param = useParams();
    console.log(param)

   

    const [eventDate, setEventDate] = useState({
        title:"",
        description:"",
        limitedNumber:"",
        enrollmentEndTime:"",
        enrollmentStartTime:"",
        endDateTime:""

    });
    const [openDate, setOpenDate] = useState(true);
    const [date1, setDate1] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    const [date2, setDate2] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);

    const handleSubmit = async (e) =>{
        e.preventDefault();


        setEventDate((prev)=>({...prev,
            enrollmentEndTime:date2[0].endDate,
            enrollmentStartTime:date2[0].startDate,
            endDateTime:date1[0].endDate
        }))

        const nickname = auth.user;
        try {
          const res = await axios.post("/api/event/create/"+param.path+"/"+nickname, eventDate)
          console.log(res.data)
         // navigate(`/study/${newStudy.path}`)
        } catch (error) {
          console.log(error);
        }
       
      }
      const handleChange = (e) =>{
        const {value , name} = e.target;
        setEventDate(prev=>({...prev,[name]: value}));
    
    } 
  return (
    <div className="flex h-screen overflow-hidden w-full">

    {/* Content area */}
  <div className=" flex flex-col  overflow-y-auto  w-full">
    <main>
      <div className=" px-4 sm:px-6 lg:px-8 py-8 w-full">

        <div className='w-full'>
          <form>
          <div className="flex flex-col mb-8 py-2  w-full">
            <h1 className=' font-mono font-bold mb-4 text-2xl'>모임 개설</h1>



                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      모임 이름
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="given-name" 
                      onChange={handleChange}
                 
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

              <div className='py-5'>
                <div className='flex items-center justify-around'>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  모집 인원
                </label>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  등록 기간
                </label>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  모임 기간
                </label>
   
                </div>
            

            <div className="flex  items-center absolute bg-white justify-around px-3 w-full">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <input
                  type="text"
                  placeholder="?"
                  name='limitedNumber'
                  id='limitedNumber'
                  onChange={handleChange}
                  className="headerSearchInput"
                 // onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date1[0].startDate, "MM/dd/yyyy")} to ${format(
                  date1[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate1([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date1}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date2[0].startDate, "MM/dd/yyyy")} to ${format(
                  date2[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate2([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date2}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>


            </div>



              </div>

              <div className='py-5'>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  상세 소개
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3} 
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="목표 설정  진행 순서"
                    
                  />
                </div>   
              </div>
              <div className=" rounded-md border border-gray-300 bg-white py-2 px-5 mt-4 text-sm font-medium
               leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-indigo-500 focus:ring-offset-2 w-20">
                <button  type="button" onClick={handleSubmit}>Save</button>
              </div>
   
                 
          </div>

          </form>

        </div>
      </div>
    </main>
  </div>
</div>
  )
}

export default EventCreate