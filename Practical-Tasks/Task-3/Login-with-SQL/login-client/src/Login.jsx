import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      setMessage(res.data.message);
      alert(res.data.message); // ✅ Show alert for valid login
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong';
      setMessage(errorMsg);
      alert(errorMsg); // ❌ Show alert for invalid login
    }
  };

  return (
    <div className="login-container">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <p className="switch-link">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
