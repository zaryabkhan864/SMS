import React from 'react'

import { Link, NavLink } from 'react-router-dom';

import { MDBDataTable } from "mdbreact";
import { useGetStudentsQuery } from '../../redux/api/studentsApi';
const QuizList = () => {
    const { data, isLoading, error } = useGetStudentsQuery();


    const setStudentList = () => {
        const students = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Name",
                    field: "name",
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
                // {
                //     label: "Payment Status",
                //     field: "status",
                //     sort: "asc",
                // },
                // {
                //     label: "Order Status",
                //     field: "orderStatus",
                //     sort: "asc",
                // },
                // {
                //     label: "Actions",
                //     field: "actions",
                //     sort: "asc",
                // },
            ],
            rows: [],
        };

        data?.students?.forEach((student) => {
            students.rows.push({
                id: student?._id,
                name: student?.name,
                age: student?.age,
                gender: student?.gender,
                grade: student?.grade?.gradeName,
                classTeacher: student?.classTeacher,
                studentPhoneNumber: student?.studentPhoneNumber,
                parentOnePhoneNumber: student?.parentOnePhoneNumber,
                // amount: `$${order?.totalAmount}`,
                // status: order?.paymentInfo?.status?.toUpperCase(),
                // orderStatus: order?.orderStatus,
                actions: (
                    <>
                        <Link to={`/me/order/${student?._id}`} className="btn btn-primary">
                            <i className="fa fa-eye"></i>
                        </Link>
                        <Link
                            to={`/invoice/order/${student?._id}`}
                            className="btn btn-success ms-2"
                        >
                            <i className="fa fa-print"></i>
                        </Link>
                    </>
                ),
            });
        });

        return students;
    };

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>Quiz</h3>
                <NavLink to="/add_quiz">
                    Add Quiz
                </NavLink>
            </div>
            <div>

                <MDBDataTable
                    data={setStudentList()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            </div>

        </main>
    )
}

export default QuizList