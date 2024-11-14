import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MDBDataTable } from "mdbreact";
import { useDeleteStudentMutation, useGetStudentsQuery } from '../../redux/api/studentsApi';
import Loader from "../layout/Loader";

const StudentList = () => {
    const { data, isLoading, error, refetch } = useGetStudentsQuery();
    const location = useLocation();

    const [
        deleteStudent,
        { isLoading: isDeleteLoading, error: deleteError, isSuccess },
    ] = useDeleteStudentMutation();

    useEffect(() => {
        // Refetch the data when the component loads
        refetch();
    }, []); // Empty dependency array means this will run only once when the component mounts

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (deleteError) {
            toast.error(deleteError?.data?.message);
        }

        if (isSuccess) {
            toast.success("Student Deleted");
            refetch();  // Refetch the data after successful deletion
        }

        // Refetch if new student added
        if (location.state?.newStudentAdded) {
            refetch();
            // Clear the state after refetch
            window.history.replaceState({}, document.title)
        }
    }, [error, deleteError, isSuccess, refetch, location.state]);

    const deleteStudentHandler = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Student?");
        if (confirmDelete) {
            deleteStudent(id);
        }
    };

    const setStudents = () => {
        const students = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Name",
                    field: "studentName",
                    sort: "asc",
                },
                {
                    label: "Age",
                    field: "age",
                    sort: "asc",
                },
                {
                    label: "Grade",
                    field: "grade",
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
                    label: "Student #",
                    field: "studentPhoneNumber",
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

        data?.students?.forEach((student) => {
            students.rows.push({
                id: student?._id,
                studentName: student?.studentName,
                age: student?.age,
                grade: student?.grade?.gradeName,
                gender: student?.gender,
                nationality: student?.nationality,
                studentPhoneNumber: student?.studentPhoneNumber,
                actions: (
                    <>
                        <Link
                            to={`/admin/update_students/${student?._id}`}
                            className="btn btn-outline-primary"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Link
                            to={`/admin/students/${student?._id}/upload_images`}
                            className="btn btn-outline-success ms-2"
                        >
                            <i className="fa fa-image"></i>
                        </Link>
                        <button
                            className="btn btn-outline-danger ms-2"
                            onClick={() => deleteStudentHandler(student?._id)}
                            disabled={isDeleteLoading}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });

        return students;
    };

    if (isLoading) return <Loader />;

    return (
        <main className='main-container'>
            <div className='main-title mb-3'>
                <h3>{data?.students?.length} Student</h3>
                <NavLink to="/admin/add_student">
                    Add Student
                </NavLink>
            </div>
            <div>
                <MDBDataTable
                    data={setStudents()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            </div>
        </main>
    );
};

export default StudentList;
