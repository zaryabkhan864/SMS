import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useCountries } from 'react-countries';
import {
  useGetStudentDetailsQuery,
  useUpdateStudentMutation,
} from "../../redux/api/studentsApi";
import { useGetGradesQuery } from '../../redux/api/gradeApi';

const UpdateStudent = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { countries } = useCountries();
  const { data: gradesData } = useGetGradesQuery();

  const { data: studentData, isLoading: studentLoading, isError: studentError, refetch } = useGetStudentDetailsQuery(params.id);

  const [updateStudent, { isLoading: updateLoading, error: updateError, isSuccess: updateSuccess }] = useUpdateStudentMutation();

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

  useEffect(() => {
    if (studentData) {
      setStudent({
        studentName: studentData.student.studentName || "",
        age: studentData.student.age || "",
        gender: studentData.student.gender || "",
        grade: studentData.student.grade || "",
        nationality: studentData.student.nationality || "",
        // classTeacher: studentData.student.classTeacher || "",
        studentPhoneNumber: studentData.student.studentPhoneNumber || "",
        parentOnePhoneNumber: studentData.student.parentOnePhoneNumber || "",
        parentTwoPhoneNumber: studentData.student.parentTwoPhoneNumber || "",
      });
    }
  }, [studentData]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError?.data?.message);
    }
    if (updateSuccess) {
      toast.success("Student Updated...");
      navigate("/students", { state: { refetch: true } });
    }
  }, [updateError, updateSuccess, navigate]);

  const onChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateStudent({ id: params.id, body: student });
  };

  return (
    <main className='main-container'>
      <h3>Update Student</h3>
      <div>
        <form className="shadow rounded bg-body p-5" onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="studentName_field" className="form-label">Name</label>
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
            <label htmlFor="age_field" className="form-label">Age</label>
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
              <label htmlFor="gender_field" className="form-label">Gender</label>
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
              <label htmlFor="nationality_field" className="form-label">Nationality</label>
              <select
                className="form-select"
                id="nationality_field"
                name="nationality"
                value={nationality}
                onChange={onChange}
              >
                {countries?.map(({ name }) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="grade_field" className="form-label">Grade</label>
              <select
                className="form-select"
                id="grade_field"
                name="grade"
                value={grade}
                onChange={onChange}
              >
                {gradesData?.grades && gradesData.grades?.map((grade) => (
                  <option key={grade._id} value={grade._id}>
                    {grade.gradeName}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="mb-3 col">
              <label htmlFor="classTeacher_field" className="form-label">Class Teacher</label>
              <input
                type="text"
                id="classTeacher_field"
                className="form-control"
                name="classTeacher"
                value={classTeacher}
                onChange={onChange}
              />
            </div> */}
          </div>
          <div className='row'>
            <div className='mb-3 col'>
              <label htmlFor="studentPhoneNumber_field" className="form-label">Student Phone Number</label>
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
              <label htmlFor="parentOnePhoneNumber_field" className="form-label">Parent One Phone Number</label>
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
              <label htmlFor="parentTwoPhoneNumber_field" className="form-label">Parent Two Phone Number</label>
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
          <button type="submit" className="btn w-100 py-2" disabled={updateLoading}>
            {updateLoading ? "Updating..." : "UPDATE"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateStudent;
