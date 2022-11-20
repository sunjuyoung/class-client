import React  ,{ useState,useContext, useEffect }from 'react'
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';


const Password = () => {
    const {auth} = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    const [password, setPassword] = useState({
      password:"",
      confirmPassword:"",
      
    });

    useEffect(() => {


    }, [errorMsg])

    const handleSubmit = async (e) =>{
      e.preventDefault();
      if(password.confirmPassword !== password.password){
          setErrorMsg("password not Inconsistency")
          //alert("password not Inconsistency")
          return;
      }
      const nickname = auth.user;
      try {
     
        const res = await axios.post("/api/settings/profile/"+nickname,password, {headers: {
          Authorization: "Bearer "+localStorage.ACCESS_TOKEN
        }})
        alert("save success");
        setErrorMsg("")
        
      } catch (error) {
        console.log(error);
      }
     
    }
    //setBook(prev=> ({...prev,[e.target.name] : e.target.value}));
    const handleChange = (e) =>{
      const {value , name} = e.target;
      setPassword(prev=>({...prev,[name]: value}));

  } 
  

  return (
    <div className="flex h-screen overflow-hidden w-full">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />  
          {/* Content area */}
        <div className=" flex flex-col  overflow-y-auto  w-full">
          {/*  Site header */}
          { /* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          <main>
            <div className=" px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl">
              {/* Welcome banner */}
              <WelcomeBanner />
              {/* Dashboard actions */}
              <div className='w-full'>
                <form>
                <div className="flex flex-col mb-8 py-2  max-w-xl">
                  <h1 className=' font-mono font-bold mb-4 text-2xl'>패스워드 변경</h1>
                        <div className="w-full">
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="given-name" 
                            
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                         </div>
                         <div className="w-full">
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            autoComplete="given-name" 
                            
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                         </div>

                         {errorMsg && <p className=' text-red-600'>{errorMsg} .. check username or password</p>}

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

export default Password