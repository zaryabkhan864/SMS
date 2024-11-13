import React, { useEffect, useState } from "react";
// import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";

// import MetaData from "../layout/MetaData";
// import AdminLayout from "../layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { GRADE_CATEGORIES } from '../../constrants/constrants';
import { useCountries } from 'react-countries'
import {

  useGetTeacherDetailsQuery,
  useUpdateTeacherMutation,
} from "../../redux/api/teachersApi";

const UpdateTeacher = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { countries } = useCountries()

  const [teacher, setTeacher] = useState({
    teacherName: "",
    age: "",
    gender: "",
    nationality: "",
    teacherPhoneNumber: "",
    teacherSecondPhoneNumber: "",
  });

  const { teacherName, age, gender, nationality, teacherPhoneNumber, teacherSecondPhoneNumber } = teacher;

  const [updateTeacher, { isLoading, error, isSuccess }] =
    useUpdateTeacherMutation();

  const { data } = useGetTeacherDetailsQuery(params?.id);


  useEffect(() => {
    if (data?.teacher) {
      setTeacher({
        teacherName: data?.teacher?.teacherName,
        age: data?.teacher?.age,
        gender: data?.teacher?.gender,
        grade: data?.teacher?.grade,
        nationality: data?.teacher?.nationality,
        teacherPhoneNumber: data?.teacher?.teacherPhoneNumber,
        teacherSecondPhoneNumber: data?.teacher?.teacherSecondPhoneNumber,
      });
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Teacher updated");
      navigate("/teachers");
    }
  }, [error, isSuccess, data]);

  const onChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateTeacher({ id: params?.id, body: teacher });
  };

  return (

    <main className='main-container'>
      <div className='main-title mb-3'>
      </div>
      <div>
        <form className="shadow rounded bg-body p-5"
          onSubmit={submitHandler}>

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
                id="teacherPhoneNumber_field"
                className="form-control"
                name="teacherSecondPhoneNumber"
                value={teacherSecondPhoneNumber}
                onChange={onChange}
              />
            </div>
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

export default UpdateTeacher;
