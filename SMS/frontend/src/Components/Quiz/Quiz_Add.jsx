import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { Link, NavLink, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { useGetGradesQuery } from '../../redux/api/gradeApi';
import { useCreateQuizMutation, useGetCourseByGradeQuery, useGetStudentsByCourseQuery } from '../../redux/api/quizApi';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const Quiz_Add = () => {
    const navigate = useNavigate();
    // const params = useParams();
    const [gradeID, setGradeID] = useState('');
    const [courseID, setCourseID] = useState('');
    const [quizNo, setQuizNo] = useState('');

    const [createQuiz, { isLoading, error, isSuccess }] =
        useCreateQuizMutation();
    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success("Quiz Added...");
            navigate("/quiz");
        }
    }, [error, isSuccess]);
    // 1 get grade list here to populate the select box
    const { data: gradesData } = useGetGradesQuery();

    // 2 get course list here to populate the select box
    const { data: courseByGradeData } = useGetCourseByGradeQuery(gradeID);

    //  3 get students list here to populate the datatable
    const { data: studentsData } = useGetStudentsByCourseQuery(gradeID);

    // Initialize state for datatable
    const [datatable, setDatatable] = useState({
        columns: [
            // {
            //     label: 'ID',
            //     field: '_id',
            //     width: 0,            
            // },
            {
                label: 'Student Name',
                field: 'name',
                width: 150,
            },
            {
                label: '1',
                field: 'question1',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Question 1',
                },
                sort: 'disabled',
            },
            {
                label: '2',
                field: 'question2',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Question 2',
                },
                sort: 'disabled',
            },
            {
                label: '3',
                field: 'question3',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Question 3',
                },
                sort: 'disabled',
            },
            {
                label: '4',
                field: 'question4',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Question 4',
                },
                sort: 'disabled',
            },
            {
                label: '5',
                field: 'question5',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Question 5',
                },
                sort: 'disabled',
            },
        ],
        rows: [

        ],
    });

    // Set up rows data
    useEffect(() => {
        if (studentsData && studentsData.students) {
            // Create a new array with only the new data
            const newRows = studentsData.students.map((student) => ({
                _id: student._id,
                name: student.studentName,
            }));

            // Update the state with only the new data
            setDatatable((prevDatatable) => ({
                ...prevDatatable,
                rows: newRows,
            }));
        }
    }, [studentsData]);

    //intialize data structure for quiz
    const quizData = {
        grade: gradeID,
        course: courseID,
        quizNumber: quizNo,
        marks: datatable.rows.map((row) => ({
            student: row._id,
            question1: row.question1,
            question2: row.question2,
            question3: row.question3,
            question4: row.question4,
            question5: row.question5,
        })),
    };



    // Handle input change for question fields
    const handleInputChange = (e, rowIndex, questionNumber) => {
        const { name, value } = e.target;
        const updatedRows = [...datatable.rows];
        updatedRows[rowIndex][name] = value;
        setDatatable((prevState) => ({ ...prevState, rows: updatedRows }));
    };

    // sumbit form
    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Quiz Data:', quizData);
        createQuiz(quizData);
    };

    return (
        <main className="main-container">
            <div className='main-title mb-3'>
                {/* <MetaData title={"All Students"} /> */}
                <h3>Information Technology Quiz</h3>
                <Button onClick={submitHandler} >Save</Button>
            </div>
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
            <div id="Quiz_Add">
                <form className="shadow rounded bg-body p-5">
                    {/* Your other form elements here */}
                    <MDBDataTableV5
                        hover
                        entriesOptions={[15, 20, 25]}
                        // entries={5}
                        // pagesAmount={4}
                        data={{
                            ...datatable,
                            rows: datatable.rows.map((row, index) => ({
                                ...row,
                                question1: (
                                    <input
                                        type="text"
                                        name="question1"
                                        value={row.question1 || ''}
                                        onChange={(e) => handleInputChange(e, index, 1)}
                                    />
                                ),
                                question2: (
                                    <input
                                        type="text"
                                        name="question2"
                                        value={row.question2 || ''}
                                        onChange={(e) => handleInputChange(e, index, 2)}
                                    />
                                ),
                                question3: (
                                    <input
                                        type="text"
                                        name="question3"
                                        value={row.question3 || ''}
                                        onChange={(e) => handleInputChange(e, index, 3)}
                                    />
                                ),
                                question4: (
                                    <input
                                        type="text"
                                        name="question4"
                                        value={row.question4 || ''}
                                        onChange={(e) => handleInputChange(e, index, 4)}
                                    />
                                ),
                                question5: (
                                    <input
                                        type="text"
                                        name="question5"
                                        value={row.question5 || ''}
                                        onChange={(e) => handleInputChange(e, index, 5)}
                                    />
                                ),
                            })),
                        }}
                    />
                </form>
            </div>
        </main>
    );
};

export default Quiz_Add;
