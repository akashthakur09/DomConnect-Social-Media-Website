import React,{useState , useEffect} from 'react'
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import './SignInSignUp.css'

const Login = ({history}) => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#000000");

const nav = useNavigate();


 useEffect(()=>{
    if(localStorage.getItem("userInfo1"))
    {
         nav('/home')
    }
  },[history])


const [data,setData] = useState({})
const handleClick = async (event) => {
      event.preventDefault();
    setLoading(true)
    if (!data.email || !data.password) {
      toast.warning('Please Fill all the Feilds',{position: toast.POSITION.TOP_LEFT})
      return;
    }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        
    };
    try{
    const response = await fetch('api/users/login', requestOptions);
    const Data = await response.json();
    console.log(Data);
    
    if(Data.success){
    localStorage.setItem("userInfo1", JSON.stringify(Data));
    toast.success('Successful Login',{position: toast.POSITION.TOP_LEFT,autoClose:1000})
    setLoading(false)
    nav('/home')
    }
  else 
  {
    throw Data
  }
  }catch(Data){
      console.log(Data)
      toast.warning(Data.errors,{position: toast.POSITION.TOP_LEFT,autoClose:1000})
      setLoading(false)

  }
    
  }
function handleChange(event)
  {
       const {name,value} = event.target;

       setData((pre)=>{
         return {
         ...pre,
         [name]:value,

         }
       })

  }

  return (
<div className="container mt-5 mainBox">
  <h1>Login</h1>
  <PulseLoader  color={color} loading={loading} size={15} />
  
        <div className="card-body">
          <form action="/login" method="POST" className='form'>
            <div className="form-group">
              <label>Email</label>
              <input onChange={handleChange} type="email" className="form-control" name="email"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input onChange={handleChange}  type="password" className="form-control" name="password"/>
              <p style={{color:"#1995AD"}}> Don't have an Account! <Link to="/register">Register here</Link></p>
            </div>
            <button onClick={handleClick} className="login-btn">Login</button>
          </form>

        </div>
      
</div>
  )
}
export default Login