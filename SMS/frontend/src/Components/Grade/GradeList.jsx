import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { MDBDataTable } from "mdbreact";
import { useDeleteGradeMutation, useGetGradesQuery } from '../../redux/api/gradeApi';
import Loader from "../layout/Loader";

const GradeList = () => {
    const { data, isLoading, error, refetch: getDataRefetch } = useGetGradesQuery();
    const location = useLocation();
    const navigate = useNavigate();

    const [
        deleteGrade,
        { isLoading: isDeleteLoading, error: deleteError, isSuccess, refetch: deleteRefetch },
    ] = useDeleteGradeMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (location.state?.refetch) {
            getDataRefetch();
            navigate(location.pathname, { replace: true, state: {} }); // Clear refetch state after refetching
        }

        if (deleteRefetch) {
            getDataRefetch();
        }

        if (deleteError) {
            toast.error(deleteError?.data?.message);
        }

        if (isSuccess) {
            toast.success("Grade Deleted");
            getDataRefetch();
        }
    }, [error, deleteError, isSuccess, location, navigate]);

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
                <NavLink to="/admin/add_grade">
                    Add Grade
                </NavLink>
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
