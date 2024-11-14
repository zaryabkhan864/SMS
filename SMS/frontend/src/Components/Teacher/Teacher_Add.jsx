import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTeacherMutation } from '../../redux/api/teachersApi';
import { toast } from 'react-hot-toast';
import { useCountries } from 'react-countries';
import {
    useGetCoursesQuery,
} from '../../redux/api/courseApi';

const Teacher_Add = () => {
    const navigate = useNavigate();
    const { countries } = useCountries();
    const { data } = useGetCoursesQuery();

    const { courses } = data || {};
    const [teacher, setTeacher] = useState({
        teacherName: "",
        age: "",
        gender: "",
        nationality: "",
        teacherPhoneNumber: "",
        teacherSecondPhoneNumber: "",
        courses: [],
    });

    const { teacherName, age, gender, nationality, teacherPhoneNumber, teacherSecondPhoneNumber, courses: selectedCourses } = teacher;

    const [createTeacher, { isLoading, error, isSuccess }] = useCreateTeacherMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success('Teacher Added...');
            navigate('/teachers', { state: { newTeacherAdded: true } });  // Pass state
        }
    }, [error, isSuccess, navigate]);

    const onChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };

    const addCourse = () => {
        const newCourse = '';
        setTeacher({ ...teacher, courses: [...selectedCourses, newCourse] });
    };

    const updateCourse = (index, courseValue) => {
        const updatedCourses = [...selectedCourses];
        updatedCourses[index] = courseValue;
        setTeacher({ ...teacher, courses: updatedCourses });
    };

    const removeCourse = (index) => {
        const updatedCourses = [...selectedCourses];
        updatedCourses.splice(index, 1);
        setTeacher({ ...teacher, courses: updatedCourses });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formattedTeacher = {
            teacherName,
            age,
            gender,
            nationality,
            teacherPhoneNumber,
            teacherSecondPhoneNumber,
            courses: selectedCourses.map(course => ({ course })),
        };
        createTeacher(formattedTeacher);
    };

    return (
        <main className='main-container'>

            <h3>New Teacher</h3>
            <div>
                <form className="shadow rounded bg-body p-5" onSubmit={submitHandler}>

                    <div className="mb-3">
                        <label htmlFor="teacherName_field" className="form-label">
                            {" "}
                            Name{" "}
                        </label>
                        <input
                            type="text"
                            id="teacherName_field"
                            className="form-control"
                            name="teacherName"
                            value={teacherName}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="age_field" className="form-label">
                            {" "}
                            Age{" "}
                        </label>
                        <input
                            type="number"
                            id="age_field"
                            className="form-control"
                            name="age"
                            value={age}
                            onChange={onChange}
                        />
                    </div>

                    <div className="row">

                        <div className="mb-3 col">
                            <label htmlFor="gender_field" className="form-label">
                                {" "}
                                Gender{" "}
                            </label>
                            <select
                                className="form-select"
                                id="gender_field"
                                name="gender"
                                value={gender}
                                onChange={onChange}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="mb-3 col">
                            <label htmlFor="nationality_field" className="form-label">
                                {" "}
                                Nationality{" "}
                            </label>
                            <select
                                className="form-select"
                                id="nationality_field"
                                name="nationality"
                                value={nationality}
                                onChange={onChange}
                            >
                                {countries?.map(({
                                    name,
                                    dial_code,
                                    code,
                                    flag
                                }) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mb-3 col'>
                            <label htmlFor="teacherPhoneNumber_field" className="form-label">
                                {" "}
                                teacherPhoneNumber{" "}
                            </label>
                            <input
                                type="text"
                                id="teacherPhoneNumber_field"
                                className="form-control"
                                name="teacherPhoneNumber"
                                value={teacherPhoneNumber}
                                onChange={onChange}
                            />
                        </div>
                        <div className='mb-3 col'>
                            <label htmlFor="teacherSecondPhoneNumber_field" className="form-label">
                                {" "}
                                teacherSecondPhoneNumber{" "}
                            </label>
                            <input
                                type="text"
                                id="teacherSecondPhoneNumber_field"
                                className="form-control"
                                name="teacherSecondPhoneNumber"
                                value={teacherSecondPhoneNumber}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='courses_field' className='form-label'>
                            Courses
                        </label>
                        {selectedCourses.map((course, index) => (
                            <div key={index} className='d-flex mb-2'>
                                <select
                                    className='form-select me-2'
                                    value={course}
                                    onChange={(e) => updateCourse(index, e.target.value)}
                                >
                                    <option value='' disabled>
                                        Select a course
                                    </option>
                                    {courses && courses.map((course) => (
                                        <option key={course._id} value={course._id}>
                                            {course.courseName}
                                        </option>
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
                        <button type='button' className='btn btn-primary' onClick={addCourse}>
                            Add Course
                        </button>
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
    );
}

export default Teacher_Add;
