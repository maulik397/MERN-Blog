import React, { useState } from "react";
import axios from "axios";

import "../pages/styles/login.css";

import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8001/user/login", {
        email,
        password,
      },{withCredentials:true});
      // Navigate to the home page

      if (response.status === 200) {
        navigate("/profile");
        
      }
    } catch (err) {
      setError("Invalid email, name, or password");
    }
   
  };
 

  return (
    <div className="login">
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      
    </div>
  );
};

export default Login;
