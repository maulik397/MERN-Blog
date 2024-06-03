import React from "react";
import { useEffect, useState } from "react";
// import axios from 'axios'
import Post from "./Post.jsx";

// import "./styles/home.css";
function Home() {
  const [posts, setPosts] = useState([]);
  const [searchpost, setSearchPosts] = useState([]);
  useEffect(() => {
    //this will fetch all post from databse and  give it to <post/> .jsx
    fetch("http://localhost:8001/post").then((response) =>
      response.json().then((posts) => {
        setPosts(posts);
        // setSearchPosts(posts);
      })
    );
   
  }, []);

  return (
    <>
      <div className="container my-3 d-flex justify-content-end">
        <div className="group"> 
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            onInput={(e) => {
              // console.log(e.target.value)
              let search = posts.filter((post) => {
                return (post.title.match(e.target.value)||post.author.username.match(e.target.value)||post.summary.match(e.target.value));
                // return e.target.value.match(posrt.title);
              });
              // console.log(search)
              if (search) {
                setSearchPosts(search);
              } else {
                setSearchPosts([]);
              }
            }}
            placeholder="Search"
            type="search"
            className="input"
          />
        </div>
      </div>
      <div className="container" style={{ marginBottom: "10vh" }}>
        <div className="d-flex my-3 gap-3 flex-wrap">
          {searchpost.length === 0 &&
            posts.length > 0 &&
            posts.map((post) => <Post key={post._id} {...post} />)}
          {searchpost.length !== 0 &&
            posts.length > 0 &&
            searchpost.map((post) => <Post key={post._id} {...post} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
