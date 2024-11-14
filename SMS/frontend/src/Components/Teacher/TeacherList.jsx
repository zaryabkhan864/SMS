import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MDBDataTable } from "mdbreact";
import { useDeleteTeacherMutation, useGetTeachersQuery } from '../../redux/api/teachersApi';
import Loader from "../layout/Loader";

const TeacherList = () => {
    const { data, isLoading, error, refetch } = useGetTeachersQuery();
    const location = useLocation();

    const [
        deleteTeacher,
        { isLoading: isDeleteLoading, error: deleteError, isSuccess },
    ] = useDeleteTeacherMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (deleteError) {
            toast.error(deleteError?.data?.message);
        }

        if (isSuccess) {
            toast.success("Teacher Deleted");
            refetch();  // Refetch the data after successful deletion
        }

        // Refetch if new teacher added or updated
        if (location.state?.newTeacherAdded || location.state?.updated) {
            refetch();
            // Clear the state after refetch
            window.history.replaceState({}, document.title);
        }
    }, [error, deleteError, isSuccess, refetch, location.state]);

    const deleteTeacherHandler = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
        if (confirmDelete) {
            deleteTeacher(id);
        }
    };

    const setTeachers = () => {
        const teachers = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Name",
                    field: "teacherName",
                    sort: "asc",
                },
                {
                    label: "Age",
                    field: "age",
                    sort: "asc",
                },
                {
                    label: "Gender",
                    field: "gender",
                    sort: "asc",
                },
                {
                    label: "Nationality",
                    field: "nationality",
                    sort: "asc",
                },
                {
                    label: "Teacher #",
                    field: "teacherPhoneNumber",
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

        data?.teachers?.forEach((teacher) => {
            teachers.rows.push({
                id: teacher?._id,
                teacherName: teacher?.teacherName,
                age: teacher?.age,
                gender: teacher?.gender,
                nationality: teacher?.nationality,
                teacherPhoneNumber: teacher?.teacherPhoneNumber,
                actions: (
                    <>
                        <Link
                            to={`/admin/update_teachers/${teacher?._id}`}
                            className="btn btn-outline-primary"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Link
                            to={`/admin/teachers/${teacher?._id}/upload_images`}
                            className="btn btn-outline-success ms-2"
                        >
                            <i className="fa fa-image"></i>
                        </Link>
                        <button
                            className="btn btn-outline-danger ms-2"
                            onClick={() => deleteTeacherHandler(teacher?._id)}
                            disabled={isDeleteLoading}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });

        return teachers;
    };

    if (isLoading) return <Loader />;

    return (
        <main className='main-container'>
            <div className='main-title mb-3'>
                <h3>{data?.teachers?.length} Teacher</h3>
                <NavLink to="/admin/add_teacher">
                    Add Teacher
                </NavLink>
            </div>
            <div>
                <MDBDataTable
                    data={setTeachers()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            </div>
        </main>
    );
};

export default TeacherList;