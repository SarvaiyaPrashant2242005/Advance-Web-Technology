import React, { useState } from 'react';
import axios from 'axios';

function Signup({ onSignupSuccess }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users', {
        ...user,
        age: parseInt(user.age)  // make sure age is a number
      });
      alert('Signup successful!');
      onSignupSuccess(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Signup failed.');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <input name="age" placeholder="Age" type="number" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
