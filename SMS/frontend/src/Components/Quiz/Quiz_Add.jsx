import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import Button from 'react-bootstrap/esm/Button';
import { useGetGradesQuery } from '../../redux/api/gradeApi';
import { useAddQuizMarksMutation, useUpdateQuizMutation, useGetCourseByGradeQuery } from '../../redux/api/quizApi';
import { toast } from "react-hot-toast";

const Quiz_Add = () => {
    const [gradeID, setGradeID] = useState('');
    const [courseID, setCourseID] = useState('');
    const [semesterNo, setSemesterNo] = useState('');
    const [termNo, setTermNo] = useState('');
    const [quizNo, setQuizNo] = useState('');

    const { data: gradesData } = useGetGradesQuery();
    const { data: courseByGradeData } = useGetCourseByGradeQuery(gradeID);

    const [addQuizMarks, { isLoading, error, data }] = useAddQuizMarksMutation();
    const [updateQuiz, { isLoading: updateQuizLoading, error: UpdateQuizError, isSuccess }] = useUpdateQuizMutation();

    const [datatable, setDatatable] = useState({
        columns: [
            {
                label: 'Student Name',
                field: 'name',
                width: 150,
            },
            {
                label: 'Question 1',
                field: 'question1',
                width: 150,
            },
            {
                label: 'Question 2',
                field: 'question2',
                width: 150,
            },
            {
                label: 'Question 3',
                field: 'question3',
                width: 150,
            },
            {
                label: 'Question 4',
                field: 'question4',
                width: 150,
            },
            {
                label: 'Question 5',
                field: 'question5',
                width: 150,
            },
        ],
        rows: [],
    });

    const fetchData = async () => {
        if (gradeID && courseID && semesterNo && termNo && quizNo) {
            try {
                console.log({
                    grade: gradeID,
                    course: courseID,
                    semester: semesterNo,
                    term: termNo,
                    quizNumber: quizNo,
                });
                const response = await addQuizMarks({
                    variables: {
                        grade: gradeID,
                        course: courseID,
                        semester: semesterNo,
                        term: termNo,
                        quizNumber: quizNo,
                    }
                });
                toast.success("Quiz Added...");
                const marksData = response.data.data.marks;
                const newRows = marksData.map((mark) => ({
                    _id: mark.student._id,
                    name: mark.student.studentName,
                    question1: mark.question1,
                    question2: mark.question2,
                    question3: mark.question3,
                    question4: mark.question4,
                    question5: mark.question5,
                }));
                setDatatable((prevDatatable) => ({
                    ...prevDatatable,
                    rows: newRows,
                }));
            } catch (error) {
                console.error("Error in fetchData:", error);
                toast.error("Error adding quiz marks");
            }
        }
    };

    useEffect(() => {
        if (UpdateQuizError) {
            toast.error(UpdateQuizError?.data?.message);
        }
        if (isSuccess) {
            toast.success("Quiz Updated Successfully...");
        }
    }, [UpdateQuizError, isSuccess]);

    useEffect(() => {
        if (gradeID && courseID && semesterNo && termNo && quizNo) {
            fetchData();
        }
    }, [gradeID, courseID, semesterNo, termNo, quizNo]);

    const handleInputChange = (e, rowIndex, questionNumber) => {
        const { name, value } = e.target;
        const updatedRows = [...datatable.rows];
        updatedRows[rowIndex][name] = value;
        setDatatable((prevState) => ({ ...prevState, rows: updatedRows }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await updateQuiz({
            id: data.data._id, body: {
                grade: gradeID,
                course: courseID,
                quizNumber: quizNo,
                semester: semesterNo,
                term: termNo,
                marks: datatable.rows.map((row) => ({
                    student: row._id,
                    question1: Number(row.question1),
                    question2: Number(row.question2),
                    question3: Number(row.question3),
                    question4: Number(row.question4),
                    question5: Number(row.question5),
                })),
            }
        });
    };

    return (
        <main className="main-container">
            <div className='main-title mb-3'>
                <h3>Information Technology Quiz</h3>
                <div>
                    <Button onClick={fetchData} className="ms-2">Refresh</Button>
                    <Button onClick={submitHandler}>Save</Button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="inputState" className="form-label">Select Grade</label>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => setGradeID(e.target.value)}>
                        <option selected>Select Grade</option>
                        {gradesData?.grades?.map((grade) => (
                            <option key={grade._id} value={grade._id}>{grade.gradeName}</option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="inputState" className="form-label">Select Course</label>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => setCourseID(e.target.value)}>
                        <option selected>Select Course</option>
                        {courseByGradeData?.courses?.map((course) => (
                            <option key={course._id} value={course._id}>{course.courseName}</option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="inputState" className="form-label">Select Semester</label>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => setSemesterNo(e.target.value)}>
                        <option selected>Select Semester No</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="inputState" className="form-label">Select Term</label>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => setTermNo(e.target.value)}>
                        <option selected>Select Term</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="inputState" className="form-label">Select Quiz No</label>
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
                    <MDBDataTableV5
                        hover
                        entriesOptions={[15, 20, 25]}
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
