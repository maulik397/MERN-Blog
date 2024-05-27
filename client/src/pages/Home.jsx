import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Post from './Post.jsx'
function Home() {

  const [posts,setPosts]= useState([])
useEffect( ()=>{
//this will fetch all post from databse and  give it to <post/> .jsx
fetch('http://localhost:8001/post').then(response=>
  response.json().then(posts=>{
   
    setPosts(posts);
  })
)

},[]);


  return (
    <>
    {posts.length > 0 && posts.map(post =>(
      <Post {...post}/>
    )
    )}
    
  </>
  )
}

export default Home
