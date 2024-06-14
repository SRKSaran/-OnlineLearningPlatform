import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNavBar from "../../components/adminNavbar";
import { updateCourse } from "../../services/courseService";
import { getCookie } from "../../utils";

function EditCourse() {
  const location = useLocation();
  const { courseId, title, description, instructor, price } =
    location.state || {};
    const token = getCookie("jwtToken");

  // State for form data
  const [formData, setFormData] = useState({
    title: title || "",
    description: description || "",
    instructor: instructor || "",
    price: price || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    updateCourse(formData.title, formData.description, formData.instructor, formData.price, courseId, token);
    console.log("Form submitted:", formData);
  };
  const handleCancelEdit = () => {
    window.location.href = "/admin";
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
            <label className="form-label">Course Title:</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter course title"
              value={formData.title} // Bind value to state
              onChange={handleChange} // Handle input change
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Description:</label>
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Enter course description"
              value={formData.description} // Bind value to state
              onChange={handleChange} // Handle input change
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Instructor:</label>
            <input
              type="text"
              name="instructor"
              className="form-control"
              placeholder="Enter instructor's name"
              value={formData.instructor} // Bind value to state
              onChange={handleChange} // Handle input change
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Price:</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Enter course price"
              value={formData.price} // Bind value to state
              onChange={handleChange} // Handle input change
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary w-25 cancel"
              onClick={handleCancelEdit}
            >
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

export default EditCourse;
