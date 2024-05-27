import React, { useEffect,useContext } from 'react'
import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import './Header.css'
import axios from 'axios';
import { UserContext } from './UserContext';

function Header() {
  const [username, setUsername] = useState(null);
  const {userInfo, setUserInfo} =useContext(UserContext);


  useEffect(()=>{
    const checkAuth = async() => {
      const response = await axios.get('http://localhost:8001/profile',{
        withCredentials:true
      });
      if(response.data?.status===401){
        redirect('/');
        return;
      }
      
      setUsername(response.data.username);
      console.log("this is header user info  ",userInfo);
    }
     
    checkAuth();
  },[userInfo]);

const  logout = async()=>{
  
    try{
      await axios.post('http://localhost:8001/logout',{},{ withCredentials: true })
      console.log(`Logging out`);
      
      setTimeout(() => {  window.location.href = "/";}, 1000)
      
    }catch(e)
    {
      console.log(e);
    }
  }
  console.log(username);

  return (
    <header className="header">
    <div className="container ext">
      <h1 className="logo">My Blog</h1>
      <nav className="nav">
        { username && (
            <ul>
           <li> <Link to='/create'>Create post </Link></li>
           <li><a onClick={logout}>Logout</a></li>
            </ul>
          )}
          {!username &&(
            <>
            <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
      
    <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Signup</Link></li>
        </ul>

            </>
          )}
        
      </nav>
    </div>
  </header>
  )
}

export default Header
//1:18:24 /

  /*useEffect(() => {
    axios("http://localhost:8001/profile", {
      credentials: 'include',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(userInfo => {
      setUsername(userInfo.username);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []);*/