import React  ,{ useState,useContext, useEffect }from 'react'
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';


const Profile = () => {
    const {auth} = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [profile,setProfile ] = useState({
      bio:"",
      url:"",
      occupation:"",
      location:"",
    });


    useEffect(() => {
      const fetchData = async () =>{
        try {
          const nickname = localStorage.user;
          
          await axios.get("/api/settings/profile/"+nickname,
          {headers: {
            Authorization: "Bearer "+localStorage.ACCESS_TOKEN
          }},{responseType: 'json'},{responseEncoding: 'utf8'}
          ).then((res)=>{
            
            setProfile(prev=>({...prev,...res.data? res.data: ""}))
          })
  
        } catch (error) {
          console.log(error);
        }
      }
        fetchData();

    }, [])
    const handleSubmit = async (e) =>{
      e.preventDefault();

      const nickname = auth.user;
      try {
        const dd = JSON.stringify(profile);
        const res = await axios.post("/api/settings/profile/"+nickname,profile, {headers: {
          Authorization: "Bearer "+localStorage.ACCESS_TOKEN
        }})
        alert("save success");
       
      } catch (error) {
        console.log(error);
      }
     
    }
    //setBook(prev=> ({...prev,[e.target.name] : e.target.value}));
    const handleChange = (e) =>{
      const {value , name} = e.target;
      setProfile(prev=>({...prev,[name]: value}));

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
                <div className="sm:flex flex-col mb-8 py-2">
                  <h1>인물소개</h1>
                  

                  <div className='py-5'>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      자기 소개
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3} 
                        value={profile.bio} 
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="you@example.com"
                        
                      />
                    </div>   
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                          URL
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                            http://
                          </span>
                          <input
                            type="text"
                            name="url"
                            id="url" 
                            value={profile.url} 
                            onChange={handleChange}
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="www.example.com"
                          />
                        </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          occupation
                        </label>
                        <input
                          type="text"
                          name="occupation"
                          id="occupation"
                          autoComplete="given-name" 
                          value={profile.occupation} 
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>


                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          지역
                        </label>
                        <select
                          id="location"
                          name="location"
                          autoComplete="country-name" 
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>

                  <div className=" rounded-md border border-gray-300 bg-white py-2 px-5 mt-4 text-sm font-medium
                   leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
                    focus:ring-indigo-500 focus:ring-offset-2 w-20">
                    <button  type="button" onClick={handleSubmit}>Save</button>
                  </div>
                </div>
                </form>

                <div className="sm:flex flex-col sm:items-center mb-8">
                  <div className='flex flex-col gap-11 items-center'>
                      <label className="block text-sm font-medium text-gray-700">Photo</label>
                      <div className="mt-1 items-center">
                        <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <div>
                          <button
                            type="button"
                            className="  items-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Change
                          </button>
                        </div>
                      </div>

                      <div>
                      <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>


                

                

              </div>
            </div>
          </main>
        </div>
    </div>
  )
}

export default Profile