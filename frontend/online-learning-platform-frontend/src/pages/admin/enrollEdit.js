import React, { useState } from 'react';
import AdminNavBar from "../../components/adminNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils";
import { editEnrollment } from '../../services/enrollService';

function EditEnrollment() {
  const location = useLocation();
  const { studentId, studentName, courseId, courseName, instructor } = location.state || {};
  const token = getCookie("jwtToken");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: studentName || "",
    courseName: courseName || "",
    instructor: instructor || ""
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
    editEnrollment(token, studentId, formData.studentName, courseId, formData.courseName, formData.instructor);
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    navigate("/admin/viewEnroll");
  };


  return (
    <div>
      <AdminNavBar />
      <div className="container mt-5">
        <form onSubmit={handleSubmit} className="addcourse-form p-4 bg-light border rounded">
          <div className="form-group mb-3">
            <label className="form-label">Student Name:</label>
            <input
              type="text"
              name="studentName"
              className="form-control"
              value={formData.studentName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Course Title:</label>
            <input
              type="text"
              name="courseName"
              className="form-control"
              value={formData.courseName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Instructor:</label>
            <input
              type="text"
              name="instructor"
              className="form-control"
              value={formData.instructor}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-primary w-25 cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary w-25">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEnrollment;
