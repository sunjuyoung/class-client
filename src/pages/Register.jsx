import React,{useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from '../api/axios';

const Register = () => {

  
  const [inputs, setInputs] = useState({
      nickname:"",
      password:"",
      email:"",
    })
    const [errMsg, setErrMsg] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
      setErrMsg('');
    },[inputs])
    
  
    const handleChange = (e) =>{
        setInputs(prev=>({...prev,[e.target.name]: e.target.value}))
    } 
  
    const handleSubmit = async (e) =>{
      e.preventDefault()
      try {
        const res = await axios.post("/api/signUp",inputs);
        console.log(JSON.stringify(res?.data));
        navigate("/login")
      } catch (e) {
        if(!e?.response){
          setErrMsg('No server response')
        } else if(e.response.status === 401){
          setErrMsg('signUp Failed ');
        }
        console.log(e)
        //setErr(e.response.data)
      }
      
    }

  return (    
    <div className="w-full h-screen overflow-hidden py-20">

      <div className='flex flex-col justify-center items-center mx-auto '>
      <h1 className='py-10 font-bold '>Sign Up</h1>
      <form className='flex flex-col gap-2 '>

          <input className='rounded'
          type="email" placeholder='email' name='email' 
          onChange={handleChange} required/>

          <input className='rounded'
          type="text" placeholder='nickname' name='nickname' autoComplete='off' 
          onChange={handleChange} required/>

          <input className='rounded'
          type="password" placeholder='password' name='password' 
          onChange={handleChange} required/>

          <button className=' bg-gradient-to-r from-cyan-600 to-teal-500 text-white 
          rounded-md hover:from-cyan-500 hover:to-teal-400'
          onClick={handleSubmit}>Sign Up</button>

          {errMsg && <p>{errMsg} .. check username or password</p>}
         
          <hr></hr>
          <span className=' underline'><Link to="/login">Login Page</Link></span>
      </form>
      </div>
    </div>
  )
}

export default Register