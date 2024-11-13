import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import CourseAdd from "../Course/CourseAdd";
import CourseUpdate from "../Course/CourseUpdate";
import Grade from "../Grade/Grade";
import GradeAdd from "../Grade/GradeAdd";
import GradeUpdate from "../Grade/GradeUpdate";
import StudentAdd from "../Student/StudentAdd";
import StudentUpdate from "../Student/StudentUpdate";
import TeacherAdd from "../Teacher/TeacherAdd";
import TeacherUpdate from "../Teacher/TeacherUpdate";
import NewUser_Layout from "../User/NewUser_Layout";



const adminRoutes = () => {
  return (
    <>
      <Route
        path="/admin/new_user"
        element={
          <ProtectedRoute admin={true}>
            <NewUser_Layout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add_student"
        element={
          <ProtectedRoute admin={true}>
            <StudentAdd />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/update_students/:id"
        element={
          <ProtectedRoute admin={true}>
            <StudentUpdate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add_teacher"
        element={
          <ProtectedRoute admin={true}>
            <TeacherAdd />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/update_teachers/:id"
        element={
          <ProtectedRoute admin={true}>
            <TeacherUpdate />
          </ProtectedRoute>
        }
      />
      {/* course paths */}
      <Route
        path="/admin/add_course"
        element={
          <ProtectedRoute admin={true}>
            <CourseAdd />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/update_courses/:id"
        element={
          <ProtectedRoute admin={true}>
            <CourseUpdate />
          </ProtectedRoute>
        }
      />
      {/* grade paths */}
      <Route
        path="/grades"
        element={
          <ProtectedRoute admin={true}>
            <Grade />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add_grade"
        element={
          <ProtectedRoute admin={true}>
            <GradeAdd />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/update_grades/:id"
        element={
          <ProtectedRoute admin={true}>
            <GradeUpdate />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default adminRoutes;
