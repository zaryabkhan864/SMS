import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateCourseMutation, useGetCoursesQuery } from "../../redux/api/courseApi";

const Course_Add = () => {
    const [course, setCourse] = useState({
        courseName: "",
        description: "",
        code: "",
        year: "",

    });
    const { courseName, description, code, year } = course;
    const navigate = useNavigate();
    const { refetch: refetchCourses } = useGetCoursesQuery(); // Import refetch function

    const [createCourse, { isLoading, error, isSuccess }] =
        useCreateCourseMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success("Course Added...");
            navigate("/courses");
            refetchCourses();
        }
    }, [error, isSuccess]);

    const onChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const Data = {
            courseName,
            description,
            code,
            year,
        };

        createCourse(Data);
    };

    return (
        <main className='main-container'>
            <div className='main-title mb-3'>
                <h3>New Course</h3>
            </div>
            <form className="shadow rounded bg-body p-5" onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="courseName_field" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        id="courseName_field"
                        className="form-control"
                        name="courseName"
                        value={courseName}
                        onChange={onChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description_field" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description_field"
                        className="form-control"
                        name="description"
                        value={description}
                        onChange={onChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="code_field" className="form-label">
                        Code
                    </label>
                    <input
                        type="text"
                        id="code_field"
                        className="form-control"
                        name="code"
                        value={code}
                        onChange={onChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="year_field" className="form-label">
                        Year
                    </label>
                    <input
                        type="text"
                        id="year_field"
                        className="form-control"
                        name="year"
                        value={year}
                        onChange={onChange}
                    />
                </div>

                <button
                    id="submit_button"
                    type="submit"
                    className="btn w-100 py-2"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "CREATE"}

                </button>
            </form>
        </main>
    );
}

export default Course_Add;