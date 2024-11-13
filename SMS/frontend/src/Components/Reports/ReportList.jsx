import React, { useEffect, useState } from "react";

import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';

import Loader from "../layout/Loader";
import QuizByGrade from "./Quiz/QuizByGrade";
import { useGetGradesQuery } from "../../redux/api/gradeApi";
import { useGetCourseByGradeQuery, useGetQuizResultQuery, useGetStudentsByCourseQuery } from "../../redux/api/quizApi";
const ReportList = () => {
    const [gradeID, setGradeID] = useState('');
    const [courseID, setCourseID] = useState('');
    const [quizNo, setQuizNo] = useState('');
    const [allData, setAllData] = useState({
        grade_ID: '',
        course_ID: '',
        quiz_No: ''
    });
    // 1 get grade list here to populate the select box
    const { data: gradesData } = useGetGradesQuery();

    // 2 get course list here to populate the select box
    const { data: courseByGradeData } = useGetCourseByGradeQuery(gradeID);

    //  3 get students list here to populate the datatable
    const { data: studentsData } = useGetStudentsByCourseQuery(gradeID);

 
    // if ("isLoading") return <Loader />;
    const updateAllData = () => {
        setAllData({
            grade_ID: gradeID,
            course_ID: courseID,
            quiz_No: quizNo
        });
    };

    // Update allData whenever gradeID, courseID, or quizNo changes
    useEffect(() => {
        updateAllData();
    }, [gradeID, courseID, quizNo]);

    console.log("What is all data...SD", allData);

    const { data: quizResult } = useGetQuizResultQuery(allData);
    console.log("have i got answer", quizResult)
    return (
        <main className='main-container'>
            <div className='main-title mb-3'>
                <div className="row">
                    <div className="col">
                        <label for="inputState" class="form-label>">Select Grade</label>
                        {/* select with map gradesData and pass value in gradeID*/}
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setGradeID(e.target.value)}>
                            <option selected>Select Grade</option>
                            {gradesData?.grades?.map((grade) => (
                                <option value={grade._id}>{grade.gradeName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <label for="inputState" class="form-label>">Select Course</label>
                        {/* select with map courseByGradeData and pass value in courseId*/}
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setCourseID(e.target.value)}>
                            <option selected>Select Course</option>

                            {courseByGradeData?.courses?.map((course) => (
                                <option value={course._id}>{course.courseName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <label for="inputState" class="form-label>">Select Quiz No</label>
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setQuizNo(e.target.value)}>
                            <option selected>Select Quiz No</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                </div>

                <h3>Quiz Reports</h3>
                {/* {
                    user.role === "admin" && ( */}
                <NavLink to="/admin/add_grade">
                    Add Grade
                </NavLink>
                {/* )
                } */}

            </div>
            <div className="text-center">
                <QuizByGrade />
            </div>


        </main>
    );
};

export default ReportList;
