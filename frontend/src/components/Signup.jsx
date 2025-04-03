import React, { useState } from 'react';
import axios from 'axios';
import '../css/signup.css'
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    //const [mobile_number, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/signup', { name, email, password });
            alert('Signup successful!');
        } catch (error) {
            alert('Error during signup');
        }
    };

    return (
        <div className="signup-form">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="box">
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="box">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="button">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <Link to="/">
                <button>Login</button>
            </Link>
        </div>
    );
};

export default Signup;