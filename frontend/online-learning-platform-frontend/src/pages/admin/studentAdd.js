import React, { useState } from "react";
import AdminNavBar from "../../components/adminNavbar";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils";
import { addStudent } from "../../services/studentService";

function AddStudent() {
  const token = getCookie("jwtToken");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addStudent(
      token,
      formData.name,
      formData.email,
      formData.address,
      formData.phone,
      formData.password
    );
    console.log("Form submitted:", formData);
  };

  const handleCancel = () => {
    navigate("/admin/viewStudents");
  };

  return (
    <div>
      <AdminNavBar />
      <div className="container mt-5">
        <form
          onSubmit={handleSubmit}
          className="addcourse-form p-4 bg-light border rounded"
        >
          <div className="form-group mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Email:</label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Address:</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Phone:</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary w-25 cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary w-25">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
