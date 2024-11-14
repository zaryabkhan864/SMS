import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink } from 'react-router-dom';
import { MDBDataTable } from "mdbreact";
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
import Loader from "../layout/Loader";

import { useDeleteCourseMutation, useGetCoursesQuery } from "../../redux/api/courseApi";

const CourseList = () => {
    const userRole = Cookies.get("userRole");
    const { data, isLoading, error, refetch } = useGetCoursesQuery(); // Destructure refetch from useGetCoursesQuery

    const [
        deleteCourse,
        { isLoading: isDeleteLoading, error: deleteError, isSuccess },
    ] = useDeleteCourseMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (deleteError) {
            toast.error(deleteError?.data?.message);
        }

        if (isSuccess) {
            toast.success("Course Deleted Successfully");
            refetch(); // Manually refetch data after successful deletion
        }
    }, [error, deleteError, isSuccess, refetch]); // Add refetch to the dependency array

    const deleteCourseHandler = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (confirmDelete) {
            deleteCourse(id);
        }
    };

    const setCourses = () => {
        const courses = {
            columns: [
                {
                    label: "Name",
                    field: "courseName",
                    sort: "asc",
                },
                {
                    label: "Description",
                    field: "description",
                    sort: "asc",
                },
                {
                    label: "Code",
                    field: "code",
                    sort: "asc",
                },
                {
                    label: "Year",
                    field: "year",
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

        data?.courses?.forEach((course) => {
            courses.rows.push({
                id: course?._id,
                courseName: course?.courseName,
                description: course?.description,
                code: course?.code,
                year: course?.year,
                actions: (
                    <>
                        <Link
                            to={`/admin/update_courses/${course?._id}`}
                            className="btn btn-outline-primary"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button
                            className="btn btn-outline-danger ms-2"
                            onClick={() => deleteCourseHandler(course?._id)}
                            disabled={isDeleteLoading}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });

        return courses;
    };

    if (isLoading) return <Loader />;

    return (
        <main className='main-container'>
            <div className='main-title mb-3'>
                <h3>{data?.courses?.length} Course</h3>
                {
                    userRole === "admin" && (
                        <NavLink to="/admin/add_course">
                            Add Course
                        </NavLink>
                    )
                }
            </div>
            <div>
                <MDBDataTable
                    data={setCourses()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            </div>
        </main>
    );
};

export default CourseList;
