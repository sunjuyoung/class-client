import React  ,{ useState,useContext, useEffect }from 'react'
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';


const Profile = () => {
    const {auth} = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
      const fetchData = async () =>{
        try {
          const nickname = localStorage.getItem("nickname");       
          const res = await axios.get("/api/settings/profile/"+nickname,
          {headers: {
            Authorization: "Bearer "+auth.accessToken
          }})
          console.log(JSON.stringify(res.data))
        } catch (error) {
        }
      }
        fetchData();

    }, [])
    const handleSubmit = () =>{

    }
    
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />  

          {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          {/*  Site header */}
          { /* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

          <main>
            <div className=" px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Welcome banner */}
              <WelcomeBanner />

              {/* Dashboard actions */}
              <div className='flex justify-between'>
                <form>
                <div className="sm:flex flex-col mb-8">
                  <h1>인물소개</h1>
                  
                  <label>한줄 소개</label>
                  <input type="text" id='bio'/>
                  <label>한줄 소개</label>
                  <input type="text" id='url'/>
                  <label>한줄 소개</label>
                  <input type="text" id='occupation' />
                  <label>한줄 소개</label>
                  <input type="text" id='location' />
                  <div>
                    <button onClick={handleSubmit}>Save</button>
                  </div>
                </div>
                </form>
                <div className="sm:flex flex-col sm:items-center mb-8">
                  <h1>profile image</h1>
                  <input type="file" />

                  </div>
              </div>
            </div>
          </main>
        </div>
    </div>
  )
}

export default Profile