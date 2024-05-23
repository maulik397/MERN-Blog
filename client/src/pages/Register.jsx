import React,{useState} from 'react'
import axios from 'axios';
import "../pages/styles/signup.css";
function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8001/user/signup', {
        email,
        username,
        password
      });

      console.log(response.data); // Log response from the server

      // Clear form fields after successful submission
      setEmail('');
      setUsername('');
      setPassword('');
      setError('');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      setError(error.response.data.message); // Display error message to user
    }
  };

  return (
    <div className="register-form ">
      <h2>Signup page</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
