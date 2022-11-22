import React  ,{ useState,useContext, useEffect }from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { Link,useNavigate } from 'react-router-dom'
import { Tab } from '@headlessui/react'
import { MultiSelect } from "react-multi-select-component";


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

const Setting = ({studyData}) => {
  const {auth} = useContext(AuthContext);
  const [newStudy,setNewStudy ] = useState({});
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  let options = [];
  let zoneData = [];
  const [zones, setZones] = useState([]);

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setNewStudy(studyData);
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

const handleAddition =  async (tag) => {  
  setTags([...tags, tag]);
  const nickname = auth.user;
  try {
    const res = await axios.post("/api/settings/tag/" + nickname, {title:tag.text})
    alert("save success");
    setErrorMsg(null);

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
    const nickname = auth.user;
    const res = await axios.post("/api/settings/zone/"+nickname, zoneData)

} catch (error) {
  console.log(error)
}
}
options = zones;
  
  return (
    <Tab.Group>
    <div className="flex w-full max-w-9xl  col-span-full sm:col-span-12 xl:col-span-12  items-center">
      <div className=' w-40 max-w-sm px-2'>
      
      <Tab.List className="flex flex-col mt-4 gap-4">
        <Tab>소개</Tab>
        <Tab>스터디 주제</Tab>
        <Tab>활동 지역</Tab>
      </Tab.List>
    
  
      </div>
      <div className=' w-full max-w-xl  pr-10 mr-10'>
      {studyData == null? "loading": (<>
      <Tab.Panels>
        <Tab.Panel>
        <div>
        <form>
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
      </Tab.Panels>
      </>)}
      </div>
    </div>
    </Tab.Group>
  )
}

export default Setting