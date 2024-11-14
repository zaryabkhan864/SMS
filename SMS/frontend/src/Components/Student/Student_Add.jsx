import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateStudentMutation } from '../../redux/api/studentsApi';
import { toast } from "react-hot-toast";
import {
    useGetGradesQuery,
} from '../../redux/api/gradeApi';

import { useCountries } from 'react-countries'
import { useGetTeachersQuery } from '../../redux/api/teachersApi';
const Student_Add = () => {
    const navigate = useNavigate();
    const { data: teacherData } = useGetTeachersQuery();
    const { countries } = useCountries()
    const { data: gradesData } = useGetGradesQuery();


    const [student, setStudent] = useState({
        studentName: "",
        age: "",
        gender: "",
        nationality: "",
        grade: "",
        // classTeacher: "",
        studentPhoneNumber: "",
        parentOnePhoneNumber: "",
        parentTwoPhoneNumber: "",

    });
    const { studentName, age, gender, grade, nationality,
        //  classTeacher,
          studentPhoneNumber, parentOnePhoneNumber, parentTwoPhoneNumber } = student;
    const [createStudent, { isLoading, error, isSuccess }] =
        useCreateStudentMutation();
    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success("Student Added...");
            navigate("/Students");
        }
    }, [error, isSuccess]);

    const onChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };



    const submitHandler = (e) => {
        e.preventDefault();
        const formattedStudent = {
            studentName,
            age,
            gender,
            grade,
            nationality,
            // classTeacher,
            studentPhoneNumber,
            parentOnePhoneNumber,
            parentTwoPhoneNumber,

        };
        createStudent(formattedStudent);
    };
    return (
        <main className='main-container'>

            <h3>New Student</h3>
            <div>
                <form className="shadow rounded bg-body p-5"
                    onSubmit={submitHandler}>

                    <div className="mb-3">
                        <label htmlFor="studentName_field" className="form-label">
                            {" "}
                            Name{" "}
                        </label>
                        <input
                            type="text"
                            id="studentName_field"
                            className="form-control"
                            name="studentName"
                            value={studentName}
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
                                <option value="">Select Gender</option>
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

                    <div className="row">
                        <div className="mb-3 col">
                            <label htmlFor="grade_field" className="form-label">
                                {" "}
                                Grade{" "}
                            </label>
                            <select
                                className="form-select"
                                id="grade_field"
                                name="grade"
                                value={grade}
                                onChange={onChange}
                            >
                                <option value="">Select Grade</option>
                                {gradesData?.grades && gradesData.grades?.map((grade) => (
                                    <option key={grade._id} value={grade._id}>
                                        {grade.gradeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* <div className="mb-3 col">
                            <label htmlFor="classTeacher_field" className="form-label">
                                {" "}
                                Class Teacher{" "}
                            </label>
                            <select
                                className="form-select"
                                id="classTeacher_field"
                                name="classTeacher"
                                value={classTeacher}
                                onChange={onChange}
                            >
                                <option value="">Select Class Teacher</option>
                                {teacherData?.teachers && teacherData.teachers?.map((teacher) => (
                                    <option key={teacher._id} value={teacher._id}>
                                        {teacher.teacherName}
                                    </option>
                                ))}
                            </select>
                        </div> */}
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label htmlFor="studentPhoneNumber_field" className="form-label">
                                {" "}
                                Student Phone Number{" "}
                            </label>
                            <input
                                type="text"
                                id="studentPhoneNumber_field"
                                className="form-control"
                                name="studentPhoneNumber"
                                value={studentPhoneNumber}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-3 col">
                            <label htmlFor="parentOnePhoneNumber_field" className="form-label">
                                {" "}
                                Parent One PhoneNumber{" "}
                            </label>
                            <input
                                type="text"
                                id="parentOnePhoneNumber_field"
                                className="form-control"
                                name="parentOnePhoneNumber"
                                value={parentOnePhoneNumber}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-3 col">
                            <label htmlFor="parentTwoPhoneNumber_field" className="form-label">
                                {" "}
                                Parent Two PhoneNumber{" "}
                            </label>
                            <input
                                type="text"
                                id="parentTwoPhoneNumber_field"
                                className="form-control"
                                name="parentTwoPhoneNumber"
                                value={parentTwoPhoneNumber}
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

export default Student_Add