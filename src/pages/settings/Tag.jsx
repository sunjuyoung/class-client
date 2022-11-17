import React  ,{ useState,useContext, useEffect,useCallback,useRef }from 'react'
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import '@yaireo/dragsort/dist/dragsort.css'


const Tag = () => {
    const {auth} = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState();

    const tagifyRef1 = useRef()
  
    // just a name I made up for allowing dynamic changes for tagify settings on this component
    const [tagifySettings, setTagifySettings] = useState([])
    const [tagifyProps, setTagifyProps] = useState({})

    const baseTagifySettings = {
        blacklist: ["xxx", "yyy", "zzz"],
        maxTags: 6,
        //backspace: "edit",
        placeholder: "type something",
        dropdown: {
          enabled: 0 // a;ways show suggestions dropdown
        }
      }

      useEffect(() => {
        setTagifyProps({loading: true})       
            setTagifyProps((lastProps) => ({
              ...lastProps,
              whitelist: [
                "aaa",
                "aaa1",
                "aaa2",
                "aaa3",
                "bbb1",
                "bbb2",
                "bbb3",
                "bbb4"
              ],
              showFilteredDropdown: "a",
              loading: false
            }))

        // simulate state change where some tags were deleted
        setTimeout(
          () =>
            setTagifyProps((lastProps) => ({
              ...lastProps,
              defaultValue: ["abc"],
              showFilteredDropdown: false
            })),
          5000
        )
      }, [])

    const handleSubmit = async (e) =>{
      e.preventDefault();

      const nickname = auth.user;
      try {
     
        const res = await axios.post("/api/settings/profile/"+nickname, {headers: {
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
    //   const {value , name} = e.target;
    //   setPassword(prev=>({...prev,[name]: value}));

  } 

  const onChange = useCallback(e => {
    console.log("CHANGED:", e.detail.value)
  }, [])

  const settings = {
    ...baseTagifySettings,
    ...tagifySettings
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
                  <h1 className=' font-mono font-bold mb-4 text-2xl'>관심 주제</h1>
                
                  <Tags
                    tagifyRef={tagifyRef1}
                    settings={settings}
                    defaultValue="a,b,c"
                    autoFocus={true}
                    {...tagifyProps}
                    onChange={onChange}
                    onEditInput={() => console.log("onEditInput")}
                    onEditBeforeUpdate={() => console.log`onEditBeforeUpdate`}
                    onEditUpdated={() => console.log("onEditUpdated")}
                    onEditStart={() => console.log("onEditStart")}
                    onEditKeydown={() => console.log("onEditKeydown")}
                    onDropdownShow={() => console.log("onDropdownShow")}
                    onDropdownHide={() => console.log("onDropdownHide")}
                    onDropdownSelect={() => console.log("onDropdownSelect")}
                    onDropdownScroll={() => console.log("onDropdownScroll")}
                    onDropdownNoMatch={() => console.log("onDropdownNoMatch")}
                    onDropdownUpdated={() => console.log("onDropdownUpdated")}
                />
                       
                </div>
                </form>

              </div>
            </div>
          </main>
        </div>
    </div>
  )
}

export default Tag