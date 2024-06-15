import React, { useState, useEffect } from 'react';
import "../../assets/styles/student.css";
import NavBar from "../../components/navbar.js";
import { getCookie } from "../../utils.js";
import { getEnrolledCoursesById } from "../../services/courseService.js"; 
import { getUserIdFromCookie } from '../../utils.js';

function StudentCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getCookie("jwtToken");
  const userId = getUserIdFromCookie();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getEnrolledCoursesById(token, userId);
        console.log("coursesData:", coursesData);
        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Error fetching courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token, userId]); 

  return (
    <div>
      <NavBar />

      <div className="d-flex">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          courses.map(course => (
            <div key={course._id} className="course-card col-2">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <p>Instructor: {course.instructor}</p>
              <p>Price: ${course.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentCourse;
