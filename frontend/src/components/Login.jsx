import React, { useState } from 'react';
import axios from 'axios';
import Signup from './Signup';
import { Link } from 'react-router-dom';
import '../css/login.css'
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
    const [email_or_mobile, setEmailOrMobile] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email_or_mobile, password });
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
        } catch (error) {
            alert('Error during login');
        }
    };

    return (
      <div className="login-form">
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder="Email or Mobile Number" value={email_or_mobile} onChange={(e) => setEmailOrMobile(e.target.value)} required />
                <FaUser className="icon"/>
            </div>
            <div className="input-box">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <FaLock className="icon"/>
            </div>
            <button type="submit">Login</button>
        </form>
        <Link to="/Signup">
            <button>Signup</button>
        </Link>
      </div>
    );
};

export default Login;