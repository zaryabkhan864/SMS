import React from "react";
import { NavLink } from 'react-router-dom';

const ReportList = () => {
    return (
        <main className='main-container'>
            <div className='main-title mb-3'>
                <h2>Reports</h2>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <NavLink to="/add_grade" className="btn btn-primary mb-2">
                    Individual Report
                </NavLink>
                <NavLink to="/QuizByGradeMain" className="btn btn-secondary">
                    Grade Reports
                </NavLink>
            </div>
        </main>
    );
};

export default ReportList;
