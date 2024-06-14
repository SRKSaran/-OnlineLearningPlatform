import React, { useState, useEffect } from "react";
import "../../assets/styles/admin.css";
import AdminNavBar from "../../components/adminNavbar";
import { getCookie } from "../../utils";
import { getCourses, deleteCourse } from "../../services/courseService";
import { useNavigate } from "react-router-dom";

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getCookie("jwtToken");
  const navigate = useNavigate();

  const handleAddCourse = () => {
    navigate("/admin/addCourse");
  };
  const handleEditCourse = (
    courseId,
    title,
    description,
    instructor,
    price
  ) => {
    navigate("/admin/editCourse", {
      state: {
        courseId,
        title,
        description,
        instructor,
        price,
      },
    });
  };
  const handleDeleteCourse = (courseId) => {
    deleteCourse(token, courseId);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses(token);
        console.log("coursesData:", coursesData);
        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Error fetching courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  return (
    <div>
      <AdminNavBar />
      <div className="d-flex flex-column mx-5 mt-3">
        <div className="d-flex mx-3 box">
          <button onClick={handleAddCourse} className="custom-button ">
            Add Course
          </button>
        </div>
        <div className="d-flex flex-wrap justify-content-between">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            courses.map((course) => (
              <div key={course._id} className="course-card2 col-2">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <p>Instructor: {course.instructor}</p>
                <p>Price: ${course.price}</p>
                <div className="d-flex justify-content-between">
                  <button
                    onClick={() =>
                      handleEditCourse(
                        course._id,
                        course.title,
                        course.description,
                        course.instructor,
                        course.price
                      )
                    }
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
