import React from "react";
import { Route } from "react-router-dom";


import ProtectedRoute from "../auth/ProtectedRoute";
import Course from "../Course/Course";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Student from "../Student/Student";
import Teacher from "../Teacher/Teacher";
import Quiz from "../Quiz/Quiz";
import QuizAdd from "../Quiz/QuizAdd";
import QuizByGrade from "../Reports/Quiz/QuizByGrade";
import Reports from "../Reports/Reports";



const userRoutes = () => {
  return (
    <>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />


      <Route path="/students" element={<Student />} />
      <Route path="/teachers" element={<Teacher />} />
      <Route path="/courses" element={<Course />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/add_quiz" element={<QuizAdd />} />
      <Route path="/QuizByGrade" element={<QuizByGrade />} />
      <Route path="/reports" element={<Reports />} />
    </>

  );
};

export default userRoutes;
