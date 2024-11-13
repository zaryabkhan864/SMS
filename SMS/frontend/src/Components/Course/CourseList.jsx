import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { MDBDataTable } from "mdbreact";
// import MetaData from "../layout/MetaData";
import { useDeleteCourseMutation, useGetCoursesQuery } from '../../redux/api/courseApi';
import Loader from "../layout/Loader";
const CourseList = () => {
    const { data, isLoading, error } = useGetCoursesQuery();
    const { refetch } = useGetCoursesQuery();
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const courseSuccess = searchParams.get("course_success");

    const [
        deleteCourse,
        { isLoading: isDeleteLoading, error: deleteError, isSuccess },
    ] = useDeleteCourseMutation();


    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (courseSuccess) {
            navigate("/courses");
        }

        if (deleteError) {
            toast.error(deleteError?.data?.message);
        }

        if (isSuccess) {
            toast.success("Course Deleted");

            refetch();

        }
    }, [error, deleteError, isSuccess, data]);

    const deleteCourseHandler = (id) => {
        deleteCourse(id);
    };

    const setCourses = () => {
        const courses = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
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
                    <div className="text-center">
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
                    </div>
                ),
            });
        });

        return courses;
    };

    if (isLoading) return <Loader />;

    return (
        <main className='main-container'>
            <div className='main-title mb-3'>


                <h3>{data?.courses?.length} Courses</h3>
                {/* {
                    user.role === "admin" && ( */}
                <NavLink to="/admin/add_course">
                    Add Course
                </NavLink>
                {/* )
                } */}

            </div>
            <div className="text-center">
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
