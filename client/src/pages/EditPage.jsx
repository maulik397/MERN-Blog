import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from "../Component/Editor.js"; // Assuming Editor is a rich text editor component
import axios from 'axios';

export default function EditPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null); // Use singular 'file' for consistency
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/post/${id}`); // Use axios for GET requests
        const postInfo = response.data;
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchData();
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('id', id);
    if (file) {
      formData.append('file', file);
    }

    try {
      function getTokenFromCookie() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
          const [name, value] = cookie.split('=');
          if (name.trim() === 'token') {
            return decodeURIComponent(value);
          }
        }
        return null; // Return null if the token cookie is not found
      }
      const token = getTokenFromCookie();
      console.log(token);
      /*const response = await axios.put('http://localhost:8001/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          'Authorization': `Bearer ${token}`// Set content type for file uploads
        },
      });*/
      const response = await fetch('http://localhost:8001/post',{
        method:'PUT',
        body:formData,
        credentials:'include'
      });

      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form onSubmit={updatePost} style={{marginBottom:"10vh"}}>
      <input
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFile(ev.target.files[0])}  required/> {/* Access the first selected file */}
      <Editor onChange={setContent} value={content} />
      <button type='submit' style={{ marginTop: '5px' }}>Update post</button>
    </form>
  );
}
