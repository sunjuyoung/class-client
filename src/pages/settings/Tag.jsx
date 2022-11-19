import React  ,{ useState,useContext, useEffect,useCallback,useRef }from 'react'
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { WithContext as ReactTags } from 'react-tag-input';


const suggestions = [
  {id:"test", text:"test"},
  {id:"test", text:"test"},
  {id:"test", text:"test"},
  {id:"test", text:"test"},
  {id:"test", text:"test"},
  
]


const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


const Tag = () => {
    const {auth} = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    const [reqData, setReqData] = useState({
      title:""
    });
    const [tags, setTags] = useState([
      { id: 'Vietnam', text: 'Vietnam' },
      { id: 'Turkey', title: 'Turkey' },
    ]);

    const handleDrag = (tag, currPos, newPos) => {
      const newTags = tags.slice();
  
      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);
  
      // re-render
      setTags(newTags);
    };
  
    const handleTagClick = (index) => {
      console.log('The tag at index ' + index + ' was clicked');
    };
    

    

      useEffect(() => {
        const fetchData = async () =>{
            try {
                const res = await axios.get("/api/settings/tag/"+auth.user)
                  console.log(res.data);
            } catch (error) {
                
            }

        }
       // fetchData();
      }, [])

    // SAVE 
    const handleSubmit = async (e) =>{
      e.preventDefault();


      const nickname = auth.user;
      try {
        const res = await axios.post("/api/settings/tag/"+nickname, tagTitle, {headers: {
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

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition =  async (tag) => {  
    setReqData(()=> ({title:tag.text}));
    setReqData((state)=>(console.log(state)))
    setTags([...tags, tag]);
    //addTag();
    const nickname = auth.user;
    try {
      const res = await axios.post("/api/settings/tag/" + nickname, {title:tag.text})
      alert("save success");
      setErrorMsg(null);

    } catch (error) {
      console.log(error);
    }

  };


  const addTag = async () =>{
    const nickname = auth.user;
    console.log(tags);
    try {
      const res = await axios.post("/api/settings/tag/" + nickname, reqData)
      alert("save success");
      setErrorMsg(null);

    } catch (error) {
      console.log(error);
    }
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
            <div className=" px-4 sm:px-6 lg:px-8 py-8 w-full">
              {/* Welcome banner */}
              <WelcomeBanner />
              {/* Dashboard actions */}
              <div className='w-full'>
                <form>
                <div className="flex flex-col mb-8 py-2  w-full">
                  <h1 className=' font-mono font-bold mb-4 text-2xl'>관심 주제</h1>
                
                <div className='w-full'>
                <ReactTags
                  tags={tags}
                  suggestions={suggestions}
                  delimiters={delimiters}
                  handleDelete={handleDelete}
                  handleAddition={(tag,e)=>handleAddition(tag,e)}
                  handleDrag={handleDrag}
                  handleTagClick={handleTagClick}
                  inputFieldPosition="top"
                  //autocomplete
                 // editable
                 />
                </div>

                {/* <div className=" rounded-md border border-gray-300 bg-white py-2 px-5 mt-4 text-sm font-medium
                    leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
                      focus:ring-indigo-500 focus:ring-offset-2 w-20">
                    <button  type="button" onClick={handleSubmit}>Save</button>
                </div> */}
                       
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