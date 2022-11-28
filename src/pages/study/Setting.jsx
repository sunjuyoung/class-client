import React  ,{ useState,useContext, useEffect }from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { Link,useNavigate } from 'react-router-dom'
import { Tab } from '@headlessui/react'
import { MultiSelect } from "react-multi-select-component";
import { useLocation, useParams } from 'react-router-dom';

const suggestions = [
  {id:"Java", text:"Java"},
  {id:"Python", text:"Python"},
  {id:"javascript", text:"javascript"},
  {id:"Spring", text:"Spring"},
]
const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Setting = () => {
  const {auth} = useContext(AuthContext);
  const [newStudy,setNewStudy ] = useState({});
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  let options = [];
  let zoneData = [];
  const [zones, setZones] = useState([]);
  const [selected, setSelected] = useState([]);
  const param = useParams();
  const [studyData, setStudyData] = useState({});

  //지역 리스트
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
           const res = await axios.get("/api/study/"+param.path)
           console.log(res.data)
    
           setTags(res.data.tags.map(text=>{
               return {id:text.id,text:text.title}
           }))    
           if(res.data.zones.length !== 0){
            setSelected(res.data.zones.map((text)=>{
                    return {label:text.localNameOfCity,value:text.localNameOfCity}
                }))    
            
          }
          setStudyData(res.data);
      } catch (error) {
        console.log(error)
      }
  }
  fetchData();
    
  }, [])

 
  const handleSubmit = async (e) =>{
    e.preventDefault();
    //const nickname = auth.user;
    try {
      //const res = await axios.post("/api/study/"+nickname, newStudy)
     // console.log(res.data)
     // navigate(`/study/${res.data}`)
    } catch (error) {
      console.log(error);
    }
   
  }
  const handleChange = (e) =>{
    const {value , name} = e.target;
    setNewStudy(prev=>({...prev,[name]: value}));

} 

//스터디 공개
const handlePublishSubmit = async (e) =>{
  e.preventDefault();
  const nickname = auth.user;
  try {
    const res = await axios.post("/api/study/publish/"+param.path+"/"+nickname)
    if(res.data === 'success'){
      alert(res.data)
    }else{
      alert("권한이 없습니다.")
    }
  
  } catch (error) {
    console.log(error);
  }
}
//스터디 비공개
const handleCloseSubmit = async (e) =>{
  e.preventDefault();
  const nickname = auth.user;
  try {
    const res = await axios.post("/api/study/close/"+param.path+"/"+nickname)
    if(res.data === 'success'){
      alert(res.data)
    }else{
      alert("권한이 없습니다.")
    }
  
  } catch (error) {
    console.log(error);
  }
}

//tag
const handleDelete = async (i) => {
  try {
      const nickname = auth.user;
      const res = await axios.delete("/api/settings/tag/" + nickname+"/"+tags[i].text)
      alert("delete success");
    setErrorMsg(null);
    setTags(tags.filter((tag, index) => index !== i));
  } catch (error) {
    console.log(error);
  }
  
};

//tag add
const handleAddition =  async (tag) => {  
  setTags([...tags, tag]);
  const nickname = auth.user;
  try {
    const res = await axios.post("/api/study/tag/" + param.path, {title:tag.text})
    alert("save success");

  } catch (error) {
    console.log(error);
  }

};
const handleDrag = (tag, currPos, newPos) => {
  const newTags = tags.slice();

  newTags.splice(currPos, 1);
  newTags.splice(newPos, 0, tag);

  setTags(newTags);
};
const handleTagClick = (index) => {
  console.log('The tag at index ' + index + ' was clicked');
};


//zone
const handleZoneSubmit = async (e) =>{
  e.preventDefault();
    selected.map(value=>{
      zoneData.push({value:value.value});
    })

  try {
    const res = await axios.post("/api/study/zone/"+param.path, zoneData)
    alert("success")

} catch (error) {
  console.log(error)
}
}
options = zones;


  
  return (
    <>
    <Tab.Group>
    <div className="flex w-full h-auto max-w-9xl col-span-full sm:col-span-12 xl:col-span-12  items-center">
      <div className=' w-40 max-w-sm px-2 mr-4 items-center justify-center'>
      <Tab.List className="flex flex-col mt-4 gap-4  items-center">
        <Tab>소개</Tab>
        <Tab>스터디 주제</Tab>
        <Tab>활동 지역</Tab>
        <Tab>스터디</Tab>
      </Tab.List>
      </div>

      <div className=' w-full max-w-xl pr-10 mr-10'>
      
      <Tab.Panels>
        <Tab.Panel>
        <div>
        <form>
          <div className='py-5 my-5'>
          
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                짧은 소개
              </label>
              <div className="mt-1">
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  rows={3} 
                  onChange={handleChange}
                  value={studyData.shortDescription}
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
                  value={studyData.fullDescription}
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
            </form>
            </div>
        </Tab.Panel>



          {/*  ---- tag  ----- */}
        <Tab.Panel> 
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
              </div>
              </form>

              </div>
        </Tab.Panel>

 {/*  ---- zone  ----- */}
        <Tab.Panel>
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
                  <button  type="button" onClick={handleZoneSubmit}>Save</button>
              </div> 
                     
              </div>

              </form>

            </div>
        </Tab.Panel>
        <Tab.Panel>

          <div>
            
            {!studyData.published? ( 
            <div>
              <h1>스터디 공개</h1>
              <form>
              <div>
                <p> 스터디를 다른 사용자에게 공개할 준비가 되었다면 버튼을 클릭하세요.
                    소개, 배너 이미지, 스터디 주제 및 활동 지역을 등록했는지 확인하세요.
                    스터디를 공개하면 주요 활동 지역과 스터디 주제에 관심있는 다른 사용자에게 알림을 전송합니다.</p>
              </div>
              <div className=" rounded-md border border-gray-300 bg-white py-2 px-5 mt-4 text-sm font-medium
              leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
              focus:ring-indigo-500 focus:ring-offset-2 w-20">
              <button  type="button" onClick={handlePublishSubmit}>스터디 공개</button>
             
            </div>
              </form>
            </div>
          ): (        
            <div>
              <h1>스터디 비공개</h1>
              <form>
              <div>
                <p>스터디 활동을 마쳤다면 스터디를 종료하세요.
                   스터디를 종료하면 더이상 팀원을 모집하거나 모임을 만들 수 없으며, 스터디 경로와 이름을 수정할 수 없습니다.
                   스터디 모임과 참여한 팀원의 기록은 그대로 보관합니다.</p>
              </div>
              <div className=" rounded-md border border-gray-300 bg-white py-2 px-5 mt-4 text-sm font-medium
              leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
              focus:ring-indigo-500 focus:ring-offset-2 w-20">
              <button  type="button" onClick={handleCloseSubmit}>스터디 비공개</button>
             
            </div>
              </form>
            </div>
           )} 
           


           <div>
              <h1>스터디 이름 변경</h1>
              <form>
              <div>
                <p className=''> 스터디 이름을 수정합니다</p>
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
                    value={studyData.title}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className=" rounded-md border border-gray-300 bg-white py-2 px-2 mt-4 text-sm font-medium
              leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
              focus:ring-indigo-500 focus:ring-offset-2 w-20">
              <button  type="button" onClick={handleSubmit}>이름 변경</button>
             
            </div>
              </form>
            </div>


           <div>
              <h1>스터디 삭제</h1>
              <form>
              <div>
                <p className=' bg-red-400'>  스터디를 삭제하면 스터디 관련 모든 기록을 삭제하며 복구할 수 없습니다.</p>
              </div>
              <div className=" rounded-md border border-red-300 bg-red-400 py-2 px-5 mt-4 text-sm font-medium
              leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
              focus:ring-indigo-500 focus:ring-offset-2 w-20">
              <button  type="button" onClick={handleSubmit} >스터디 삭제</button>
             
            </div>
              </form>
            </div>


          </div>

        </Tab.Panel>
      </Tab.Panels>
    
      </div>
    </div>
    </Tab.Group>
    </>
  )
}

export default Setting