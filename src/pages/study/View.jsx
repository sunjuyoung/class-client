import React  ,{ useState,useContext, useEffect,useCallback,useRef }from 'react'
import Sidebar from '../../partials/Sidebar';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { Tab } from '@headlessui/react'
import Intro from './Intro';
import Members from './Members';
import Setting from './Setting';
import Event from './Event';

const Create = () => {
   
  const {auth} = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="flex h-screen overflow-hidden w-full">
    {/* Sidebar */}
    {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />   */}
        {/* Content area */}
      <div className=" flex flex-col  overflow-y-auto  w-full">
        {/*  Site header */}
        { /* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        <main>
          <div className=" px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Welcome banner */}
            <WelcomeBanner />
            {/* Dashboard actions */}
            <div className='w-full'>
              <form>
              <div className="flex flex-col mb-8 py-2  w-full">
                <h1 className=' font-mono font-bold mb-4 text-2xl'>스터디 </h1>

                    <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900 p-1 max-w-xl">
                    <Tab
                        className={({ selected }) =>
                            classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                            selected
                                ? 'bg-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                        >소개 </Tab>
                                                <Tab
                        className={({ selected }) =>
                            classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                            selected
                                ? 'bg-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                        >구성원 </Tab>
                                                <Tab
                        className={({ selected }) =>
                            classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                            selected
                                ? 'bg-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                        >모임 </Tab>
                                                                        <Tab
                        className={({ selected }) =>
                            classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                            selected
                                ? 'bg-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                        >설정 </Tab>
                        </Tab.List>
                        <Tab.Panels>

                            <Tab.Panel>
                                <Intro />
                            </Tab.Panel>

                            <Tab.Panel>
                                <Members />
                            </Tab.Panel>
                             
                            <Tab.Panel>
                             <Event />
                            </Tab.Panel>
                                
                            <Tab.Panel>
                              <Setting />
                            </Tab.Panel>
                        </Tab.Panels>
                        </Tab.Group>
               
                    
                     
              </div>

              </form>

            </div>
          </div>
        </main>
      </div>
  </div>
  )
}


export default Create

