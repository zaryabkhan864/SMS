import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink } from 'react-router-dom';
// import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import { useSelector } from 'react-redux';
// import MetaData from "../layout/MetaData";
import { useDeleteStudentMutation, useGetStudentsQuery } from '../../redux/api/studentsApi';
import Cookies from "js-cookie";
import Loader from "../layout/Loader";
const StudentList = () => {

    // get the userRole from cookie
    const userRole = Cookies.get("userRole");

    const { data, isLoading, error } = useGetStudentsQuery();


    const [
        deleteStudent,
        { isLoading: isDeleteLoading, error: deleteError, isSuccess },
    ] = useDeleteStudentMutation();


    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (deleteError) {
            toast.error(deleteError?.data?.message);
        }

        if (isSuccess) {
            toast.success("Student Deleted");
        }
    }, [error, deleteError, isSuccess, data]);

    const deleteStudentHandler = (id) => {
        deleteStudent(id);
    };

    const setStudents = () => {
        const students = {
            columns: [
                // {
                //     label: "ID",
                //     field: "id",
                //     sort: "asc",
                // },
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
                    label: "Grade",
                    field: "grade",
                    sort: "asc",
                },
                {
                    label: "Teacher",
                    field: "classTeacher",
                    sort: "asc",
                },
                {
                    label: "Student #",
                    field: "studentPhoneNumber",
                    sort: "asc",
                },
                {
                    label: "Parents #",
                    field: "parentOnePhoneNumber",
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
                gender: student?.gender,
                nationality: student?.nationality,
                grade: student?.grade?.gradeName,
                classTeacher: student?.classTeacher,
                studentPhoneNumber: student?.studentPhoneNumber,
                parentOnePhoneNumber: student?.parentOnePhoneNumber,
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
                {/* <MetaData title={"All Students"} /> */}

                <h3>{data?.students?.length} Students</h3>
                {
                    userRole === "admin" && (
                        <NavLink to="/admin/add_student">
                            Add Student
                        </NavLink>
                    )
                }

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
