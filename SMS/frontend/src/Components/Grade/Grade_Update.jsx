import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useGetGradeDetailsQuery, useUpdateGradeMutation } from "../../redux/api/gradeApi";
import { useGetCoursesQuery } from "../../redux/api/courseApi";

const UpdateGrade = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: coursesData } = useGetCoursesQuery();
  const { data, isLoading: gradeLoading, isError: gradeError, refetch } = useGetGradeDetailsQuery(params.id);
  const [updateGrade, { isLoading: updateLoading, error: updateError, isSuccess: updateSuccess }] = useUpdateGradeMutation();

  const [grade, setGrade] = useState({
    gradeName: "",
    description: "",
    yearFrom: "",
    yearTo: "",
    courses: []
  });

  useEffect(() => {
    // Force refetch of grade details when component is mounted
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) {
      const selectedCourseIds = data.grade.courses.map(course => course.course);
      setGrade({
        gradeName: data.grade.gradeName,
        description: data.grade.description,
        yearFrom: data.grade.yearFrom,
        yearTo: data.grade.yearTo,
        courses: selectedCourseIds
      });
    }
  }, [data]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError?.data?.message);
    }
    if (updateSuccess) {
      toast.success("Grade Updated...");
      navigate("/grades", { state: { refetch: true } });
    }
  }, [updateError, updateSuccess, navigate]);

  const { courses } = coursesData || {};
  const { gradeName, description, yearFrom, yearTo, courses: selectedCourses } = grade;

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
    console.log("Submitting updated grade: ", formattedGrade);
    updateGrade({ id: params.id, body: formattedGrade });
  };

  return (
    <main className='main-container'>
      <h3>Update Grade</h3>
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
          <button type="submit" className="btn w-100 py-2" disabled={updateLoading}>
            {updateLoading ? "Updating..." : "UPDATE"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateGrade;
