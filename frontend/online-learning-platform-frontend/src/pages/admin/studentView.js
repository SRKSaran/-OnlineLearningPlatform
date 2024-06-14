import React, { useState, useEffect } from "react";
import "../../assets/styles/studentView.css";
import AdminNavBar from "../../components/adminNavbar";
import { getCookie } from "../../utils";
import { deleteStudent, getStudents } from "../../services/studentService";
import { useNavigate } from "react-router-dom";

function ViewStudents() {
  const token = getCookie("jwtToken");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await getStudents(token);
        console.log("studentsData:", studentsData);
        setStudents(studentsData);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Error fetching students");
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token]);

  const handleDeleteStudent = (studentId) => {
    console.log("Student ID:", studentId);
    deleteStudent(token, studentId);
  };

  const handleEditStudent = (studentId, name, email, address, phone) => {
    navigate("/admin/editStudent", {
      state: {
        studentId,
        name,
        email,
        address,
        phone,
      },
    });
  };

  const handleAddStudent = () => {
    navigate("/admin/addStudent");
  };

  return (
    <div>
      <AdminNavBar />
      <div className="container mt-4">
        <div className="d-flex mx-3 box">
          <button className="custom-button-2" onClick={handleAddStudent}>Add Student</button>
        </div>
        <h2 class="my-3">Student List</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone No</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.address}</td>
                  <td>{student.phone}</td>
                  <td className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-primary col-5" onClick={() => handleEditStudent(student._id, student.name, student.email, student.address, student.phone)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger col-5" onClick={() => handleDeleteStudent(student._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ViewStudents;
