import React, { useState, useEffect } from 'react';
import "../assets/styles/student.css";
import NavBar from "../components/navbar";
import { getCookie } from "../utils";
import { getCoursesById } from "../services/courseService.js"; 
import { enrollCourse } from "../services/enrollService.js";
import { getUserIdFromCookie } from '../utils';

function StudentPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getCookie("jwtToken");
  const userId = getUserIdFromCookie();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCoursesById(token, userId);
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

  const handleEnroll = async (courseId) => {
    try {
        const enrollment = await enrollCourse(token, userId, courseId);
        console.log('Enrollment successful:', enrollment);
        window.location.reload();
    } catch (error) {
        console.error('Enrollment error:', error);
    }
};

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
              <button onClick={() => handleEnroll(course._id)}>Enroll</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentPage;
