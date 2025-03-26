import React, { useState } from 'react';
import axios from 'axios';
import '../css/signup.css'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile_number, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/signup', { name, email, mobile_number, password });
            alert('Signup successful! Check your email for the OTP.');
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
                    <input type="text" placeholder="Mobile Number" value={mobile_number} onChange={(e) => setMobileNumber(e.target.value)} required />
                </div>
                <div className="box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="button">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;