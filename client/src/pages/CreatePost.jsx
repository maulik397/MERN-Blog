import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/styles/createpost.css";
import axios from "axios";
import Editor from "../Component/Editor.js";

import Alert from '@mui/material/Alert';
export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirectx, setRedirectx] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    ev.preventDefault();
    let redirect=false
    const response = await fetch("http://localhost:8001/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.status === 200) {
      redirect=true
      setRedirectx(true);
    }
    if (redirect) {
      setLoader(true)
      setTimeout(()=>{
        navigate("/");
      },3000)
    }
  }
  // useEffect(()=>{
  const checkAuth = async () => {
    const response = await axios.get("http://localhost:8001/profile", {
      withCredentials: true,
    });

    if (response.data?.status === 401) {
      navigate("/");
      setLoader(false)
      setRedirectx(false);
    }
    setRedirectx(true);
  };
  checkAuth();
  if (redirectx) {
    return (
      <>
        
        <form onSubmit={createNewPost}>
          <input
            type="title"
            placeholder={"Title"}
            value={title}
            onChange={(ev) => setTitle(ev.target.value)} required
          />
          <input
            type="summary"
            placeholder={"Summary"}
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)} required
          />
          <input type="file" onChange={(ev) => setFiles(ev.target.files)} required/>
          <Editor onChange={setContent} value={content} />
          <button type="submit" style={{ marginTop: "5px" }}>Create post</button>
          {loader &&  <Alert severity="success">Post Created!!</Alert>}
        </form>
      </>
    );
  }
}
