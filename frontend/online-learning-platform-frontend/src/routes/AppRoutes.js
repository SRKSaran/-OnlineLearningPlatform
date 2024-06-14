import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NavBar from "../components/navbar";
import StudentPage from "../pages/Student";
import Admin from "../pages/admin/admin";
import AddCourse from "../pages/admin/addCourse";
import EditCourse from "../pages/admin/editCourse";
import ViewStudents from "../pages/admin/studentView";
import EditStudent from "../pages/admin/studentEdit";
import AddStudent from "../pages/admin/studentAdd";
import ViewEnrollments from "../pages/admin/enrollView";
import EditEnrollment from "../pages/admin/enrollEdit";
import AddEnrollment from "../pages/admin/enrollAdd";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/addCourse" element={<AddCourse />} />
        <Route path="/admin/editCourse" element={<EditCourse />} />
        <Route path="/admin/viewStudents" element={<ViewStudents/>} />
        <Route path="/admin/editStudent" element={<EditStudent/>} />
        <Route path="/admin/addStudent" element={<AddStudent/>} />
        <Route path="/admin/viewEnroll" element={<ViewEnrollments/>} />
        <Route path="/admin/editEnroll" element={<EditEnrollment/>} />
        <Route path="/admin/addEnrollment" element={<AddEnrollment/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
