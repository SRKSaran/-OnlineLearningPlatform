import axios from "axios";

const API_URL = 'http://localhost:8000';

export const getStudents = async (token) => {
    console.log("Token:", token);

    try {
        const response = await axios.get(`${API_URL}/api/user/getAllStudents`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching students', error);
        throw error;
    }
}

export const deleteStudent = async (token, studentId) => {
    console.log("Token:", token);
    console.log("Student ID:", studentId);

    try {
        const response = await axios.delete(`${API_URL}/api/user/deleteStudent/${studentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        window.location.reload();
        return response.data;
    } catch (error) {
        console.error('Error deleting student', error);
        throw error;
    }
}

export const editStudent = async (token, studentId, name, email, address, phone) => {
    console.log("Token:", token);

    try {
        const response = await axios.put(`${API_URL}/api/user/updateStudent/${studentId}`, {
            name,
            email,
            address,
            phone,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        window.location.href = "/admin/viewStudents";
        return response.data;
    } catch (error) {
        console.error('Error updating student', error);
        throw error;
    }
}

export const addStudent = async (token, name, email, address, phone, password) => {
    console.log("Token:", token);

    try {
        const response = await axios.post(`${API_URL}/api/user/createStudent`, {
            name,
            email,
            address,
            phone,
            password,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        window.location.href = "/admin/viewStudents";
        return response.data;
    } catch (error) {
        console.error('Error adding student', error);
        throw error;
    }
}