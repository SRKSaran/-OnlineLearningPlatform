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


export const getEnrollments = async (token) => {
    console.log("Token:", token);

    try {
        const response = await axios.get(`${API_URL}/api/enrollments/getAllEnrollments`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching enrollments', error);
        throw error;
    }
}

export const deleteEnrollment = async (token, enrollmentId) => {
    console.log("Token:", token);
    console.log("Enrollment ID:", enrollmentId);

    try {
        const response = await axios.delete(`${API_URL}/api/enrollments/deleteEnrollment/${enrollmentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        window.location.reload();
        return response.data;
    } catch (error) {
        console.error('Error deleting enrollment', error);
        throw error;
    }
}

export const editEnrollment = async (token, studentId, studentName, courseId, courseTitle, instructor) => {
    console.log("Token:", token);

    try {
        // Update the student details
        const response = await axios.put(`${API_URL}/api/user/updateStudent/${studentId}`, {
            name: studentName,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Update the course details
        await axios.put(`${API_URL}/api/courses/updateCourse/${courseId}`, {
            title: courseTitle,
            instructor,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        window.location.href = "/admin/viewEnroll";
        return response.data;
    } catch (error) {
        console.error('Error updating enrollment', error);
        throw error;
    }
}

export const getPendingEnrollments = async (token) => {
    console.log("Token:", token);

    try {
        const response = await axios.get(`${API_URL}/api/enrollments/getPendingEnrollments`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching pending enrollments', error);
        throw error;
    }
}

export const acceptEnrollment = async (token, enrollmentId) => {
    console.log("Token:", token);
    console.log("Enrollment ID:", enrollmentId);

    try {
        const response = await axios.put(`${API_URL}/api/enrollments/acceptEnrollment/${enrollmentId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        window.location.reload();
        return response.data;
    } catch (error) {
        console.error('Error accepting enrollment', error);
        throw error;
    }
}

export const rejectEnrollment = async (token, enrollmentId) => {
    console.log("Token:", token);
    console.log("Enrollment ID:", enrollmentId);

    try {
        const response = await axios.put(`${API_URL}/api/enrollments/rejectEnrollment/${enrollmentId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        window.location.reload();
        return response.data;
    } catch (error) {
        console.error('Error rejecting enrollment', error);
        throw error;
    }
}