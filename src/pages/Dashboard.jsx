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
import TagContext from '../context/TagProvider'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';


function Dashboard() {
  const {auth} = useContext(AuthContext);
  const {topTag,setTopTag} = useContext(TagContext);
  const navigate =  useNavigate();
  const [data, setData] = useState([
  ]);

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const nickname = auth.user;
          const res = await axios.get("/api/settings/tag/"+nickname)
            const tagList = res.data;
            if(res.data !== '' || res.data !== null){
              setTopTag(tagList);
            }
      } catch (error) {
        console.log(error);
      }
  }
  if(topTag !== '' || topTag !== null){
    fetchData();
  }
     
  }, []);

  useEffect(() => {
    const fetchData = async() =>{
      try {
        const res = await axios.get("/api/study/list")
        console.log(res.data);
        setData(()=>res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

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
       
            <div className="flex flex-wrap  sm:col-span-3 xl:col-span-3   gap-4   bg-white shadow-lg rounded-lg border border-slate-200">             
              {data.map((value,idx)=>(
                 <Link to={`/study/${value.path}`} state={{path:value.path}} key={value.id} 
                className="" >
                <DashboardCard01 key={idx} data={value}/>
                </Link>
              ))}
              </div>
              <div>
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