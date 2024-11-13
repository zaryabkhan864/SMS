import React, { useEffect, useState } from "react";
// import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";

// import MetaData from "../layout/MetaData";
// import AdminLayout from "../layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { GRADE_CATEGORIES } from '../../constrants/constrants';
import { useCountries } from 'react-countries'
import {
  useCreateStudentMutation,
  useGetStudentDetailsQuery,
  useUpdateStudentMutation,
} from "../../redux/api/studentsApi";
import {
  useGetCoursesQuery,
} from '../../redux/api/courseApi';
const UpdateStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: coursesData } = useGetCoursesQuery();

  const { courses } = coursesData || {};
  const { countries } = useCountries()

  const [student, setStudent] = useState({
    studentName: "",
    age: "",
    gender: "",
    nationality: "",
    grade: "",
    classTeacher: "",
    studentPhoneNumber: "",
    parentOnePhoneNumber: "",
    parentTwoPhoneNumber: "",
    courses: [],
  });

  const { studentName, age, gender, grade, nationality, classTeacher, studentPhoneNumber, parentOnePhoneNumber, parentTwoPhoneNumber, courses: selectedCourses } = student;

  const [updateStudent, { isLoading, error, isSuccess }] =
    useUpdateStudentMutation();

  const { data } = useGetStudentDetailsQuery(params?.id);
  console.log("what is data here", data)
  const addCourse = () => {
    const newCourse = '';
    setStudent({ ...student, courses: [...selectedCourses, newCourse] });
  };

  const updateCourse = (index, courseValue) => {
    const updatedCourses = [...selectedCourses];
    updatedCourses[index] = courseValue;
    setStudent({ ...student, courses: updatedCourses });
  };

  const removeCourse = (index) => {
    const updatedCourses = [...selectedCourses];
    updatedCourses.splice(index, 1);
    setStudent({ ...student, courses: updatedCourses });
  };

  useEffect(() => {
    if (data?.student) {
      setStudent({
        studentName: data?.student?.studentName,
        age: data?.student?.age,
        gender: data?.student?.gender,
        grade: data?.student?.grade,
        nationality: data?.student?.nationality,
        classTeacher: data?.student?.classTeacher,
        studentPhoneNumber: data?.student?.studentPhoneNumber,
        parentOnePhoneNumber: data?.student?.studentPhoneNumber,
        parentTwoPhoneNumber: data?.student?.studentPhoneNumber,
        courses: data?.student?.courses,
      });
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Student updated");
      navigate("/students");
    }
  }, [error, isSuccess, data]);

  const onChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateStudent({ id: params?.id, body: student });
  };

  return (
    <main className='main-container'>
      <div className='main-title mb-3'>
      </div>
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
                {GRADE_CATEGORIES?.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 col">
              <label htmlFor="classTeacher_field" className="form-label">
                {" "}
                Class Teacher{" "}
              </label>
              <input
                type="text"
                id="classTeacher_field"
                className="form-control"
                name="classTeacher"
                value={classTeacher}
                onChange={onChange}
              />
            </div>
          </div>
          <div className='row'>
            <div className='mb-3 col'>
              <label htmlFor="studentPhoneNumber_field" className="form-label">
                {" "}
                studentPhoneNumber{" "}
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
            <div className='mb-3 col'>
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
            <div className='mb-3 col'>
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
            {isLoading ? "Updating..." : "UPDATE"}
          </button>
        </form>

      </div>
    </main>

  );
};

export default UpdateStudent;
