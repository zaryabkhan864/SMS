import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateCourseMutation } from '../../redux/api/courseApi';
import { toast } from "react-hot-toast";
const Course_Add = () => {


    const navigate = useNavigate();

    const [course, setCourse] = useState({
        courseName: "",
        description: "",
        code: "",
        year: "",
   
    });
    const { courseName, description, code, year } = course;
    const [createCourse, { isLoading, error, isSuccess }] =
        useCreateCourseMutation();
    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success("Course Added...");
            navigate("/courses");
        }
    }, [error, isSuccess]);

    const onChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();

        createCourse(course);
    };
    return (
        <main className='main-container'>

            <h3>New Course</h3>
            <div>
                <form className="shadow rounded bg-body p-5"
                    onSubmit={submitHandler}>

                    <div className="mb-3">
                        <label htmlFor="courseName_field" className="form-label">
                            {" "}
                            Name{" "}
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
                    <div className="mb-3 col">
                        <label htmlFor="description_field" className="form-label">
                            {" "}
                            Description{" "}
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

                    <div className="row">
                        <div className='mb-3 col'>
                            <label htmlFor="code_field" className="form-label">
                                {" "}
                                Code{" "}
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

                    </div>
                    <div className='row'>
                        <div className='mb-3 col'>
                            <label htmlFor="year_field" className="form-label">
                                {" "}
                                Year{" "}
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


                    </div>
                    <button
                        type="submit"
                        className="btn w-100 py-2"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating..." : "CREATE"}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default Course_Add