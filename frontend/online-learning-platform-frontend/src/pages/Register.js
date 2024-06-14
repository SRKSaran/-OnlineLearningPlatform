import React, { useState } from 'react';
import '../assets/styles/signup.css';
import logo from '../assets/images/logo.png';
import signupService from '../services/registerService.js';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    date: '',
    email: '',
    phone:'',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupService(formData.name, formData.address ,formData.date, formData.email, formData.phone, formData.password)
    console.log('Form submitted:', formData);
  };

  return (
    <div className="register">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
            <div className="d-flex mb-1 align-items-center justify-content-center">
                    <img src={logo} alt="Logo" className="signup-logo"  />
                </div>
              <h2 className="text-center">Sign Up</h2>
              <form className='signup-form' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Confirm password:</label>
                    <input type="password" name="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} />
                </div>
                <button type="submit">Signup</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;