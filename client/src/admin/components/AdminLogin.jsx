import React from 'react'
import { useState } from 'react';
import './AdminLogin.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({username: '', password: ''});

  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) =>{
    e.preventDefault();

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(credentials.username === ""){
      return alert("Please enter a valid username");
    }
    if(credentials.password === ""){
      return alert("please enter a valid password");
    }
   
    axios.post('http://localhost:3000/admin/login',{
      name: credentials.username,
      password: credentials.password
    })
    .then((response)=> {
      const jwtToken = response.data.token;
      console.log(jwtToken);

      localStorage.setItem('authToken', jwtToken);
      navigate(location.state?.from || "/admin")

    })
    .catch((err) => console.log(err));
  
  }


  return (
    <div className='auth'>
      <div className='auth_container'>
        <h2 className='auth_title'>Log in</h2>
        <form className="input_form" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name='username' value={credentials.username} onChange={(e) => handleInputChange(e)} placeholder='UserName'/>
            <input type="password" name='password' value={credentials.password} placeholder='Password' onChange={handleInputChange}/>
            <div>
              <span className='logorsign'>Already have an account? <button className='if_button' type='button' onClick={() => setAccount(!account)}> Sign in</button> </span>
            </div>
        
            <button className='submit_button'>Log in</button>
        </form>
        </div>
    </div>
  )
}

export default AdminLogin;