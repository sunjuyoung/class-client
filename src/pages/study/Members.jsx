import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from '../../api/axios';

const Members = () => {
  const param = useParams();
  const [members, setMembers] = useState([]);
  const [manager, setManager] = useState({});
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
  }, [])

  return (
    <div>

      <div>
        <p>MANAGER</p>
        <hr></hr>
      </div>

      <div className='flex gap-3 items-center'>
        <div>
          사진
        </div>
        <div>
          {manager.nickname}
        </div>
        <div>
          관리자
        </div>
      </div>

      <div>
        <p>MEMBERS</p>
        <hr></hr>
      </div>
    {members.map((value,idx)=>{
       return <div className='flex gap-3 items-center' key={idx}>
          <div>
            사진
          </div>
          <div>
           {value.nickname}
          </div>
          <div>
           
          </div>
      </div>
    })}
    

    </div>
  )
}

export default Members