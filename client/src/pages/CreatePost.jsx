import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import "../pages/styles/createpost.css";
import axios from 'axios';
import Editor from "../Component/Editor.js"

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    
    const response = await fetch('http://localhost:8001/post', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });

    if(response.status===200)
      {setRedirect(true);}
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
 <Editor value={content} onChange={setContent} />
  return (
    <form onSubmit={createNewPost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <ReactQuill value={content}/>
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  );
}