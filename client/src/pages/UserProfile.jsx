import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  
  useEffect(()=>{
    const checkAuth = async() => {
      const response = await axios.get('http://localhost:8001/profile',{
        withCredentials:true
      });
      if(response.data?.status===401){
        window.location.href="/";
        return;
      }
    }
  
    checkAuth();
  },[]);

  return (
    <div>
      user profile
    </div>
  )
}

export default UserProfile
