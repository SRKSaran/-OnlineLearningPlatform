import React, { useState, useEffect } from 'react';
import AdminNavBar from "../../components/adminNavbar";
import { deleteEnrollment, getEnrollments } from "../../services/enrollService";
import { getCookie } from "../../utils";
import { useNavigate } from "react-router-dom";

function ViewEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getCookie("jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const enrollmentsData = await getEnrollments(token);
        setEnrollments(enrollmentsData);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Error fetching enrollments");
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [token]);

  const handleEditEnrollment = (studentId, studentName, courseId, courseName, instructor) => {
    navigate('/admin/editEnroll', { state: { studentId, studentName, courseId, courseName, instructor } });
  };

  const handleDeleteEnrollment = (enrollmentId) => {
    console.log("Enrollment ID:", enrollmentId);
    deleteEnrollment(token, enrollmentId);
  };

  return (
    <div>
      <AdminNavBar />
      <div className="container mt-4">
        <div className="d-flex mx-3 box">
          <button className="custom-button-2" onClick={() => navigate('/admin/addEnrollment')}>Add Enrollment</button>
        </div>
        <h2 className="my-3">Enrollment List</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course</th>
                <th>Instructor</th>
                <th>Enrolled Date</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment._id}>
                  <td>{enrollment.student.name}</td>
                  <td>{enrollment.course.title}</td>
                  <td>{enrollment.course.instructor}</td>
                  <td>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</td>
                  <td className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-primary col-5"
                      onClick={() =>
                        handleEditEnrollment(
                          enrollment.student._id,
                          enrollment.student.name,
                          enrollment.course._id,
                          enrollment.course.title,
                          enrollment.course.instructor
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger col-5"
                      onClick={() => handleDeleteEnrollment(enrollment._id)}
                    >
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

export default ViewEnrollments;
