import React  ,{ useState,useContext, useEffect,useCallback,useRef }from 'react'
import Sidebar from '../../partials/Sidebar';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { Link,useNavigate } from 'react-router-dom'

const Create = () => {
  const {auth} = useContext(AuthContext);
  console.log(auth)

  const [newStudy,setNewStudy ] = useState({
    path:"",
    fullDescription:"",
    title:"",
    shortDescription:"",
  });
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const nickname = auth.user;
    try {
      const res = await axios.post("/api/study/"+nickname, newStudy)
      console.log(res.data)
      navigate(`/study/${newStudy.path}`)
    } catch (error) {
      console.log(error);
    }
   
  }
  const handleChange = (e) =>{
    const {value , name} = e.target;
    setNewStudy(prev=>({...prev,[name]: value}));

} 

  return (
    <div className="flex h-screen overflow-hidden w-full">

        {/* Content area */}
      <div className=" flex flex-col  overflow-y-auto  w-full">
        <main>
          <div className=" px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Welcome banner */}
            <WelcomeBanner />
            {/* Dashboard actions */}
            <div className='w-full'>
              <form>
              <div className="flex flex-col mb-8 py-2  w-full">
                <h1 className=' font-mono font-bold mb-4 text-2xl'>스터디 개설</h1>
  

                <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                          URL
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          {/* <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                            http://
                          </span> */}
                          <input
                            type="text"
                            name="path"
                            id="path" 
                            onChange={handleChange}
                            value={newStudy.path}
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="spring-study"
                          />
                        </div>
                        </div>


                        <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          스터디 이름
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          autoComplete="given-name" 
                          onChange={handleChange}
                          value={newStudy.title}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                  <div className='py-5'>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      짧은 소개
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="shortDescription"
                        name="shortDescription"
                        rows={3} 
                        onChange={handleChange}
                        value={newStudy.shortDescription}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder=""
                        
                      />
                    </div>   
                  </div>

                  <div className='py-5'>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      상세 소개
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="fullDescription"
                        name="fullDescription"
                        rows={3} 
                        onChange={handleChange}
                        value={newStudy.fullDescription}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder=""
                        
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


export default Create

