import React, { useEffect, useState } from "react";
// import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";

// import MetaData from "../layout/MetaData";
// import AdminLayout from "../layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { GRADE_CATEGORIES } from '../../constrants/constrants';
import { useCountries } from 'react-countries'
import {

  useGetGradeDetailsQuery,
  useUpdateGradeMutation,
} from "../../redux/api/gradeApi";

const UpdateGrade = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [grade, setGrade] = useState({
    gradeName: "",
    description: "",
    code: "",
    year: "",

  });

  const { gradeName, description, code, year } = grade;

  const [updateGrade, { isLoading, error, isSuccess }] =
    useUpdateGradeMutation();

  const { data } = useGetGradeDetailsQuery(params?.id);


  useEffect(() => {
    if (data?.grade) {
      setGrade({
        gradeName: data?.grade?.gradeName,
        description: data?.grade?.description,
        code: data?.grade?.code,
        year: data?.grade?.year,
      });
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Grade updated");
      navigate("/grades");
    }
  }, [error, isSuccess, data]);

  const onChange = (e) => {
    setGrade({ ...grade, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateGrade({ id: params?.id, body: grade });
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
            <label htmlFor="gradeName_field" className="form-label">
              {" "}
              Name{" "}
            </label>
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

export default UpdateGrade;
