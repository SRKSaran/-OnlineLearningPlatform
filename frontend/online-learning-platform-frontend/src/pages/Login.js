import React, { useState } from 'react';
import '../assets/styles/login.css'; 
import logo from '../assets/images/logo.png'; 
import loginService from '../services/loginService.js';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        loginService(formData.email, formData.password);
        console.log('Form submitted:', formData);
    };

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-logo-container">
                    <img src={logo} alt="Logo" className="login-logo" />
                </div>
                <h2 className="text-center">Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="mt-3">
                    <p>Don't have an account? <a href="/register">Sign up</a></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
