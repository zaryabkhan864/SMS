import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { MDBDataTable } from "mdbreact";
// import MetaData from "../layout/MetaData";
import { useDeleteGradeMutation, useGetGradesQuery } from '../../redux/api/gradeApi';
import Loader from "../layout/Loader";
const GradeList = () => {
    const { data, isLoading, error } = useGetGradesQuery();
    const { refetch } = useGetGradesQuery();
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const gradeSuccess = searchParams.get("grade_success");

    const [
        deleteGrade,
        { isLoading: isDeleteLoading, error: deleteError, isSuccess },
    ] = useDeleteGradeMutation();


    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (gradeSuccess) {
            navigate("/grades");
        }

        if (deleteError) {
            toast.error(deleteError?.data?.message);
        }

        if (isSuccess) {
            toast.success("Grade Deleted");

            refetch();

        }
    }, [error, deleteError, isSuccess, data]);

    const deleteGradeHandler = (id) => {
        deleteGrade(id);
    };

    const setGrades = () => {
        const grades = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Name",
                    field: "gradeName",
                    sort: "asc",
                },
                {
                    label: "Description",
                    field: "description",
                    sort: "asc",
                },
                {
                    label: "Year From",
                    field: "yearFrom",
                    sort: "asc",
                },
                {
                    label: "Year To",
                    field: "yearTo",
                    sort: "asc",
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc",
                },

            ],
            rows: [],
        };

        data?.grades?.forEach((grade) => {
            grades.rows.push({
                id: grade?._id,
                gradeName: grade?.gradeName,
                description: grade?.description,
                yearFrom: grade?.yearFrom,
                yearTo: grade?.yearTo,
                actions: (
                    <div className="text-center">
                        <Link
                            to={`/admin/update_grades/${grade?._id}`}
                            className="btn btn-outline-primary"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>

                        <button
                            className="btn btn-outline-danger ms-2"
                            onClick={() => deleteGradeHandler(grade?._id)}
                            disabled={isDeleteLoading}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                ),
            });
        });

        return grades;
    };

    if (isLoading) return <Loader />;

    return (
        <main className='main-container'>
            <div className='main-title mb-3'>


                <h3>{data?.grades?.length} Grades</h3>
                {/* {
                    user.role === "admin" && ( */}
                <NavLink to="/admin/add_grade">
                    Add Grade
                </NavLink>
                {/* )
                } */}

            </div>
            <div className="text-center">
                <MDBDataTable
                    data={setGrades()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            </div>


        </main>
    );
};

export default GradeList;
