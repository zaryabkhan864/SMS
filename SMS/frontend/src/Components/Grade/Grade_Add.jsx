import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateGradeMutation } from '../../redux/api/gradeApi';
import { toast } from "react-hot-toast";
import { useGetCoursesQuery } from '../../redux/api/courseApi';

const Grade_Add = () => {
    const { data: coursesData } = useGetCoursesQuery();
    const { courses } = coursesData || {};
    const navigate = useNavigate();

    const [grade, setGrade] = useState({
        gradeName: "",
        description: "",
        yearFrom: "",
        yearTo: "",
        courses: [],
    });

    const { gradeName, description, yearFrom, yearTo, courses: selectedCourses } = grade;
    const [createGrade, { isLoading, error, isSuccess }] = useCreateGradeMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success("Grade Added...");
            navigate("/grades", { state: { refetch: true } }); // Pass refetch state
        }
    }, [error, isSuccess]);

    const onChange = (e) => {
        setGrade({ ...grade, [e.target.name]: e.target.value });
    };

    const addCourse = () => {
        setGrade({ ...grade, courses: [...selectedCourses, ''] });
    };

    const updateCourse = (index, courseValue) => {
        const updatedCourses = [...selectedCourses];
        updatedCourses[index] = courseValue;
        setGrade({ ...grade, courses: updatedCourses });
    };

    const removeCourse = (index) => {
        const updatedCourses = [...selectedCourses];
        updatedCourses.splice(index, 1);
        setGrade({ ...grade, courses: updatedCourses });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formattedGrade = {
            gradeName,
            description,
            yearFrom,
            yearTo,
            courses: selectedCourses.map(course => ({ course })),
        };
        createGrade(formattedGrade);
    };

    return (
        <main className='main-container'>
            <h3>New Grade</h3>
            <div>
                <form className="shadow rounded bg-body p-5" onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="gradeName_field" className="form-label">Name</label>
                        <input
                            type="text"
                            id="gradeName_field"
                            className="form-control"
                            name="gradeName"
                            value={gradeName}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="description_field" className="form-label">Description</label>
                        <input
                            type="text"
                            id="description_field"
                            className="form-control"
                            name="description"
                            value={description}
                            onChange={onChange}
                        />
                    </div>
                    <div className="row">
                        <div className='mb-3 col'>
                            <label htmlFor="yearFrom_field" className="form-label">Year From</label>
                            <input
                                type="text"
                                id="yearFrom_field"
                                className="form-control"
                                name="yearFrom"
                                value={yearFrom}
                                onChange={onChange}
                            />
                        </div>
                        <div className='mb-3 col'>
                            <label htmlFor="yearTo_field" className="form-label">Year To</label>
                            <input
                                type="text"
                                id="yearTo_field"
                                className="form-control"
                                name="yearTo"
                                value={yearTo}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='courses_field' className='form-label'>Courses</label>
                        {selectedCourses.map((course, index) => (
                            <div key={index} className='d-flex mb-2'>
                                <select
                                    className='form-select me-2'
                                    value={course}
                                    onChange={(e) => updateCourse(index, e.target.value)}
                                >
                                    <option value='' disabled>Select a course</option>
                                    {courses && courses.map(course => (
                                        <option key={course._id} value={course._id}>{course.courseName}</option>
                                    ))}
                                </select>
                                <button
                                    type='button'
                                    className='btn btn-danger btn-sm'
                                    onClick={() => removeCourse(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type='button' className='btn btn-primary' onClick={addCourse}>Add Course</button>
                    </div>
                    <button type="submit" className="btn w-100 py-2" disabled={isLoading}>
                        {isLoading ? "Creating..." : "CREATE"}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Grade_Add;
