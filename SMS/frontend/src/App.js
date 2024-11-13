
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useUserRoutes from "./Components/routes/userRoutes";
import useAdminRoutes from "./Components/routes/adminRoutes";
import { Toaster } from 'react-hot-toast'

function App() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();
  return (
    <React.Fragment>
      <Router>
        <Toaster />
        <Routes>

          {userRoutes}
          {adminRoutes}
          {/* <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />


          <Route path="/students" element={<Student />} />
          <Route path="/add_student" element={<StudentAdd />} />
          <Route path="/admin/update_students/:id" element={<StudentUpdate />} />


          <Route path="/teachers" element={<Teacher />} />
          <Route path="/add_teacher" element={<TeacherAdd />} />
          <Route path="/admin/update_teachers/:id" element={<TeacherUpdate />} /> */}

          {/* <Route path="/admin/new_user" element={<NewUser_Layout />} /> */}

          {/* <Route path="/quiz" element={<Quiz />} />
          <Route path="/add_quiz" element={<QuizAdd />} /> */}
        </Routes>
      </Router>

    </React.Fragment>

  );
}

export default App;
