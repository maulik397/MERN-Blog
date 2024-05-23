import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import './Header.css'
import axios from 'axios';

function Header() {
  const [username, setUsername] = useState(null);

  useEffect(()=>{
    const checkAuth = async() => {
      const response = await axios.get('http://localhost:8001/profile',{
        withCredentials:true
      });
      if(response.data?.status===401){
        redirect('/');
        return;
      }
      console.log(response.data);
      setUsername(response.data.username);
    }
  
    checkAuth();
  },[]);
  

  return (
    <header className="header">
    <div className="container ext">
      <h1 className="logo">My Blog</h1>
      <nav className="nav">
        { username && (
            <>
            <Link to='/create'>create new post </Link>
            </>
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