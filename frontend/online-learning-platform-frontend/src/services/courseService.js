import axios from "axios";

const API_URL = 'http://localhost:8000';

export const getCoursesById = async (token, userId) => {
    console.log("Token:", token);

    try {
        const response = await axios.get(`${API_URL}/api/enrollments/getAllEnrolledCourseById/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching courses', error);
        throw error;
    }
};

export const getCourses = async (token) => {
    console.log("Token:", token);

    try {
        const response = await axios.get(`${API_URL}/api/courses/getCourses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching courses', error);
        throw error;
    }
};

export const deleteCourse = async (token, courseId) => {
    console.log("Token:", token);
    console.log("Course ID:", courseId);

    try {
        const response = await axios.delete(`${API_URL}/api/courses/deleteCourse/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        window.location.reload();
        return response.data;
    } catch (error) {
        console.error('Error deleting course', error);
        throw error;
    }
};

export const updateCourse = async (title, description, instructor, price, courseId, token) => {
    console.log("Token:", token);
    console.log("Course ID:", courseId);

    try {
        const response = await axios.put(
            `${API_URL}/api/courses/updateCourse/${courseId}`,
            {
                title,
                description,
                instructor,
                price
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        window.location.href = "/admin";
        return response.data;
    } catch (error) {
        console.error('Error updating course', error);
        throw error;
    }
};

export const addCourse = async (title, description, instructor, price, token) => {
    console.log("Token:", token);

    try {
        const response = await axios.post(
            `${API_URL}/api/courses/createCourse`,
            {
                title,
                description,
                instructor,
                price
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        window.location.href = "/admin";
        return response.data;
    } catch (error) {
        console.error('Error adding course', error);
        throw error;
    }
};

