import React  ,{ useState,useContext, useEffect,useCallback,useRef }from 'react'
import Sidebar from '../../partials/Sidebar';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { MultiSelect } from "react-multi-select-component";

const Zone = () => {

  let options = [];
  let zoneData = [];

  const [selected, setSelected] = useState([]);
  const {auth} = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const fetchData = async () =>{
      try {
          const res = await axios.get("/api/settings/zone/")
            const zoneList = res.data;
            setZones(zoneList.map(text=>{
                return {label:text,value:text}
            }))           
      } catch (error) {
        console.log(error)
      }
  }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () =>{
      try {
          const nickname = auth.user;
          const res = await axios.get("/api/settings/zone/"+nickname)
            const zoneList = res.data;
            if(zoneList.length !== 0){
              setSelected(zoneList.map(text=>{
                      return {label:text,value:text}
                  }))    
            }
          
      } catch (error) {
        console.log(error)
      }
  }
    fetchData();
  }, [])
  
  const handleSubmit = async (e) =>{
      e.preventDefault();
        selected.map(value=>{
          zoneData.push({value:value.value});
        })

      try {
        const nickname = auth.user;
        const res = await axios.post("/api/settings/zone/"+nickname, zoneData)

    } catch (error) {
      console.log(error)
    }
  }
  options = zones;

  return (
    <div className="flex h-screen overflow-hidden w-full">
    {/* Sidebar */}
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />  
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
                <h1 className=' font-mono font-bold mb-4 text-2xl'>활동 지역</h1>
                <div>
                  <h1>Select Fruits</h1>
                  <pre>{selected.value}</pre>
                    <MultiSelect
                      options={options}
                      value={selected}
                      onChange={setSelected}
                      labelledBy="Select"
                      hasSelectAll={false}
                    />
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

export default Zone