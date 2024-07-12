import React ,{useState,useEffect}from 'react'
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from 'react-router-dom';

const Register = ({history}) => {
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

  async function handleClick(event){
    //console.log(data);
    event.preventDefault();
    setLoading(true)

    const newDate = data;
    if (!data.name || !data.password|| !data.email ||!data.password2) {
      toast.warning('Please Fill all the Feilds',{position: toast.POSITION.TOP_LEFT})
          setLoading(false)
      return;
    }
    console.log(newDate)

   const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        
    };
    
    const response = await fetch('api/users/register', requestOptions)
    const Data = await response.json();

    if(!Data.error){
    toast.success('Successful Register',{position: toast.POSITION.TOP_LEFT,autoClose:1000})
    setLoading(false)
    nav('/login')
    }
    else 
    {
    toast.warning(Data.error,{position: toast.POSITION.TOP_LEFT,autoClose:1000})
    setLoading(false)
    }
    
    
  }

  return (
<div className="container mt-5 mainBox">
  <h1>Register</h1>
  <PulseLoader  color={color} loading={loading} size={15} />

        <div className="card-body">
          <form className='form'>
           <div className="form-group">
              <label htmlFor="name">Name</label>
              <input onChange={handleChange} type="name" className="form-control" name="name"/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input onChange={handleChange} type="email" className="form-control" name="email"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={handleChange} type="password" className="form-control" name="password"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm PassWord</label>
              <input onChange={handleChange} type="password" className="form-control" name="password2"/>
              <p>
             <p style={{color:"#1995AD"}}> Already have an Account! <Link to="/login">Log In</Link></p>
            </p>
            </div>
            <button onClick={handleClick} className="login-btn">Register</button>
          </form>

        </div>
      
</div>
  )
}
export default Register