import React, { useContext, useEffect, useState } from 'react';

import { useParams,redirect,useNavigate } from 'react-router-dom';
import { UserContext } from '../Component/UserContext';
import { formatISO9075 } from 'date-fns';
import {Link} from 'react-router-dom'
import axios from 'axios';
import '../pages/styles/postpage.css'



function PostDetail() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
 const[info,setInfo]=useState(null);
  const {userInfo} =useContext(UserContext);  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async()=>{


      await fetch(`http://localhost:8001/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
    }
    fetchUser()

  }, [id]);
  
  useEffect(()=>{
    const checkAuth = async() => {
      try{
        const response = await axios.get('http://localhost:8001/profile',{
        withCredentials:true
      });
      if(response.data?.status===401){
        redirect('/');
        return;
      }

     setInfo(response.data);
    }catch(error)
    {
      console.error('Error checking authentication:', error);
    }
    }
     
    checkAuth();
  },[navigate]);


  if (!postInfo) {
    return <div>Loading...</div>; // Return loading indicator while fetching data
  }

  console.log("this is info  id ",info);
 
  console.log("this is user info from post detail ",userInfo)

  if (!postInfo) {
    return <div>Loading...</div>; // Return loading indicator while fetching data
  }
  const isAuthor = info && postInfo.author && info._id === postInfo.author._id;

  return (
    <div class="post-page">
    <div class="card mb-3">
      <img class="card-img-top" src={`http://localhost:8001/${postInfo.cover}`} alt="Post cover image"></img>
      <div class="card-body">
        <h1 class="card-title">{postInfo.title}</h1>
        <div class="author">by @{postInfo.author.username}</div>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        {isAuthor && (
        <div className="edit-row">
        <button className="edit-btn" onClick={() => navigate(`/edit/${postInfo?._id}`)}>
          Edit this post
        </button>
      </div>
        )}
        <div class="content" dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
      </div>
    </div>
  </div>
  
  );
}

export default PostDetail;
/*
   <div className="post-page">
         <div >
            <img src={`http://localhost:8001/${postInfo.cover}`} alt=""/>
         </div>
      <h1>{postInfo.title}</h1>
      
      <div className="author">by @{postInfo.author.username}</div>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        {info._id === postInfo.author._id && (
         <div className="edit-row">
            <Link className="edit-btn" to={`/edit/${postInfo._id}`}>  Edit this post </Link>
        </div>
        )}
      
     
   

      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
 */