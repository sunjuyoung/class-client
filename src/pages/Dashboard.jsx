import React, { useContext, useEffect, useState } from 'react';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import Banner from '../partials/Banner';
import AuthContext from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom';
function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {auth} = useContext(AuthContext);
  const navigate =  useNavigate();
  const [data, setData] = useState([
    {
      id:1,
      title:"개발하자.",
      des:"spring, sql, "
    },
    {
      id:2,
      title:"서울 스터디",
      des:"서울 자바 스터디 모집해요"
    },
    {
      id:3,
      title:"경기 스터디.",
      des:"spring 웹 개발 하실분"
    },
    {
      id:4,
      title:"빡세게.",
      des:"데이터 베이스 스터디 ㄱ"
    },
    {
      id:5,
      title:"주말 스터디.",
      des:"주말에 리액트 개발 "
    },
    {
      id:6,
      title:"자바 스터디.",
      des:"JAVA, "
    }
  ])
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
              <DashboardAvatars />

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                {/* Add view button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Add view</span>
                </button>                
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">             
              {data.map((value)=>(
            
                <DashboardCard01 key={value.id} data={value}/>
             
              ))}

              {/* Card (Recent Activity) */}
              <DashboardCard12 />
              {/* Card (Income/Expenses) */}
              <DashboardCard13 />
              
            </div>

          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Dashboard;