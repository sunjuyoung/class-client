import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from '../../api/axios';

const Intro = () => {
  const param = useParams();
  const [desc, setDesc] = useState({});

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const res = await axios.get("/api/study/desc/"+param.path)
        setDesc(()=>res.data)
          
      } catch (error) {
        console.log(error)
      }
  }
  fetchData();
  }, [])

  return (
    <div>
      <p>{desc.shortDescription}</p>
      <p>{desc.fullDescription}</p>
    </div>
  )
}

export default Intro