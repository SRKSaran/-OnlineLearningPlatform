import React, { useState } from 'react';
import '../../assets/styles/addCourse.css';
import AdminNavBar from '../../components/adminNavbar';
import { getCookie } from "../../utils";
import { useNavigate } from "react-router-dom";
import { addCourse } from '../../services/courseService';

function AddCourse() {
    const token = getCookie("jwtToken");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor: '',
        price: ''
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
        addCourse(formData.title, formData.description, formData.instructor, formData.price, token);
    };

    return (
        <div>
            <AdminNavBar />
            <div className="container mt-5">
                <form onSubmit={handleSubmit} className='addcourse-form p-4 bg-light border rounded'>
                    <div className="form-group mb-3">
                        <label className="form-label">Course Title:</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Enter course title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Description:</label>
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Instructor:</label>
                        <input
                            type="text"
                            name="instructor"
                            className="form-control"
                            placeholder="Enter instructor name"
                            value={formData.instructor}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Price:</label>
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            placeholder="Enter price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='d-flex justify-content-between'>
                        <button type="button" className="btn btn-primary w-25 cancel" onClick={() => navigate("/admin")}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary w-25">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCourse;
