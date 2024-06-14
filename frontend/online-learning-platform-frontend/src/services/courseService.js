import axios from "axios";

const API_URL = 'http://localhost:8000';

export const getCourses = async (token, userId) => {
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
