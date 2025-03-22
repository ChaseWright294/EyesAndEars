import React, { useState } from 'react';
import axios from 'axios';
import Signup from './Signup';
import Home from '../pages/Home'
//import { Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email_or_mobile, setEmailOrMobile] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //log response being sent
            console.log({email_or_mobile, password});
            const response = await axios.post('http://localhost:5001/api/login', { email_or_mobile, password });
            console.log(response.data);

            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
            navigate('/Home')
        } catch (error) {
            alert('Error during login!');
        }
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email or Mobile Number" value={email_or_mobile} onChange={(e) => setEmailOrMobile(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
        <Link to="/Signup">
            <button>Signup</button>
        </Link>
      </div>
    );
};

export default Login;