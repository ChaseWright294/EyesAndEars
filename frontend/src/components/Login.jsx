import React, { useState } from 'react';
import axios from 'axios';
import Signup from './Signup';
import Home from '../pages/Home'
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css'
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //console.log('attempting login with: ', { email, password});
            const response = await axios.post('http://localhost:5001/api/login', { email, password });
            console.log('login successful:', response.data);

            localStorage.setItem('token', response.data.token);
            navigate('/Home')
        } catch (error) {
            console.error('Error during login:', error); 
            alert('Error during login!');
        }
    };

    return (
      <div className="login-form">
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <FaUser className="icon"/>
            </div>
            <div className="input-box">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <FaLock className="icon"/>
            </div>
            <button type="submit">Login</button>
        </form>
        <Link to="/Signup">
            <button>Don't have an account? Signup</button>
        </Link>
      </div>
    );
};

export default Login;