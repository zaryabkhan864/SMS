import React, { useEffect, useState } from "react";
// import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";

// import MetaData from "../layout/MetaData";
// import AdminLayout from "../layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { GRADE_CATEGORIES } from '../../constrants/constrants';
import { useCountries } from 'react-countries'
import {

  useGetCourseDetailsQuery,
  useUpdateCourseMutation,
} from "../../redux/api/courseApi";

const UpdateCourse = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [course, setCourse] = useState({
    courseName: "",
    description: "",
    code: "",
    year: "",

  });

  const { courseName, description, code, year } = course;

  const [updateCourse, { isLoading, error, isSuccess }] =
    useUpdateCourseMutation();

  const { data } = useGetCourseDetailsQuery(params?.id);


  useEffect(() => {
    if (data?.course) {
      setCourse({
        courseName: data?.course?.courseName,
        description: data?.course?.description,
        code: data?.course?.code,
        year: data?.course?.year,
      });
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Course updated");
      navigate("/courses");
    }
  }, [error, isSuccess, data]);

  const onChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateCourse({ id: params?.id, body: course });
  };

  return (
    // <AdminLayout>
    //     <MetaData title={"Update Product"} />
    <main className='main-container'>
      <div className='main-title mb-3'>
      </div>
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
              type="number"
              id="description_field"
              className="form-control"
              name="description"
              value={description}
              onChange={onChange}
            />
          </div>

          <div className="row">

            <div className="mb-3 col">
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
            {isLoading ? "Updating..." : "UPDATE"}
          </button>
        </form>

      </div>
    </main>

  );
};

export default UpdateCourse;
