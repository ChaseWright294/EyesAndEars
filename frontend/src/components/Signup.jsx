import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/signup', { name, email, password });
      alert('Signup successful! Please log in.');
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed!');
    }
  };

  return (
    <div className="wrapper">
      <div className="class-container">
        <div className="logo-container">
          <img src="/EyesAndEarsLogo.PNG" alt="App Logo" />
        </div>

        <div className="form-container">
          <div className="signup-form">
            <form onSubmit={handleSubmit}>
              <h1>Signup</h1>

              <div className="box">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="box">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="box">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit">Submit</button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '15px', fontSize:'28px' }}>
              Already have an account? <Link to="/" style={{ fontWeight: 'bold', color: 'black' }}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
