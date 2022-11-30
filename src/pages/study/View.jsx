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
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const View = () => {
   
  const {auth} = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studyData, setStudyData] = useState();
  const [loading, setLoading] = useState(true);
  const [tagData, setTagData] = useState();
  const [members, setMembers] = useState([]);
  const [manager, setManager] = useState({});
 // const location = useLocation();
  const param = useParams();
  const [eventBtn, setEventBtn] = useState(false);
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const res = await axios.get("/api/study/members/"+param.path)
        setMembers(()=>res.data.members);
        setManager(()=>res.data.manager);
          
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
  }
  fetchData();
  setEventBtn(false);
  }, [])

  const handleJoinSubmit = async(e) =>{
    e.preventDefault();
    try {
      const res = await axios.post("/api/study/join/"+param.path+"/"+auth.user)
      setMembers(()=>res.data.members);
      setManager(()=>res.data.manager);
        
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  let join = members.filter((value,idx)=>value.nickname == auth.user);


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
          <div className=" px-4 sm:px-6 lg:px-8 py-8 w-full ">
            {/* Welcome banner */}
            <WelcomeBanner />
            {/* Dashboard actions */}
            <div className='w-full'>
              <form>
              <div className="flex flex-col mb-8 py-2  w-full">

                <div className='flex justify-between items-center'>
                  <h1 className=' font-mono font-bold mb-4 text-2xl'>스터디 </h1>
                  <div className='flex'>
                    {manager.nickname == auth.user? (<></>): (
                                <div className=" rounded-md border border-gray-300 bg-white py-2 px-1 mt-4 text-sm font-medium
                                leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
                                focus:ring-indigo-500 focus:ring-offset-2 w-20">
                                {join == ''? (<button  type="button" onClick={handleJoinSubmit} >스터디 참가</button>):(
                                  <button  type="button" >스터디 탈퇴</button>
                                )} 
                                </div>
                              
                    )}

                          {eventBtn && join? (   
                              <div className=" rounded-md border border-gray-300 bg-white py-2 px-1 mt-4 text-sm font-medium
                              leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
                              focus:ring-indigo-500 focus:ring-offset-2 w-20">
                                <button type='button' onClick={()=>navigate(`/event-create/${param.path}`)}>모임 만들기</button>
                              </div>
                          ):(<></>)} 
                  
           
                  </div>          
                </div>

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
                                <Intro setEventBtn={setEventBtn}/>
                            </Tab.Panel>

                            <Tab.Panel>
                                <Members setEventBtn={setEventBtn} members={members} manager={manager}/>
                            </Tab.Panel>
                             
                            <Tab.Panel>
                             <Event setEventBtn={setEventBtn}/>
                            </Tab.Panel>
                                
                            <Tab.Panel>
                              <Setting setEventBtn={setEventBtn}/>
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


export default View

