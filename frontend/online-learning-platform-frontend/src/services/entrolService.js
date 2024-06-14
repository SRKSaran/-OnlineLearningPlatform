import axios from "axios";

const API_URL = 'http://localhost:8000';

export const enrollCourse = async (token, userId, courseId) => {
    console.log("Token:", token, "userId:", userId);

    try {
        const response = await axios.post(
            `${API_URL}/api/enrollments/createEnrollment`,
            {
                studentId: userId,
                courseId: courseId,
                status: 'pending'
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error enrolling course', error);
        throw error;
    }
};
