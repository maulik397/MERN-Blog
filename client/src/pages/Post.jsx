import React from 'react'
import {format} from "date-fns";

import {Link} from "react-router-dom";
import '../pages/styles/posts.css'
function Post({_id,title,summary,cover,content,createdAt,author}) {
  return (
    <div class="container">
    <div className="post">
      <div className="image">
      <Link to={`/post/${_id}`}>
          <img src={'http://localhost:8001/'+cover}  alt="{title}"/>
          </Link>
      </div>
      <div className="texts">
      <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link> 
         <p className="info">
          <a className="author">Created By {author.username}</a><br></br>
          <time>{format(new Date(createdAt),'MMM d yyyy')}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
    </div>
  )
}

export default Post
