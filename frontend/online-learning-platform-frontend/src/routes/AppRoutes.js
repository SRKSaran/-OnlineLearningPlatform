import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NavBar from "../components/navbar";
import StudentPage from "../pages/Student";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/navbar" element={<NavBar/>} />
        <Route path="/student" element={<StudentPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
