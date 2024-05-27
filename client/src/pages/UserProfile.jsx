import React from 'react'
import { useEffect,useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Component/UserContext';
function UserProfile() {
  const {userInfo, setUserInfo} =useContext(UserContext);
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
console.log("this is profile page and user  is this",userInfo);
  return (
    <div>
      this is yout user profile page  <br></br>
      {userInfo.id}
    </div>
  )
}

export default UserProfile
