import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink } from 'react-router-dom';
import { MDBDataTable } from "mdbreact";
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
import Loader from "../layout/Loader";
import { useDeleteUserMutation, useGetAdminUsersQuery } from "../../redux/api/userApi";

const NewUserList = () => {
    const userRole = Cookies.get("userRole");
    
    const { data, isLoading, error } = useGetAdminUsersQuery();

    const [
        deleteUser,
        { isLoading: isDeleteLoading, error: deleteError, isSuccess },
    ] = useDeleteUserMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (deleteError) {
            toast.error(deleteError?.data?.message);
        }

        if (isSuccess) {
            toast.success("User Deleted Successfully");
        }
    }, [error, deleteError, isSuccess, data]);

    const deleteUserHandler = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            deleteUser(id);
        }
    };

    const setUsers = () => {
        const users = {
            columns: [
                {
                    label: "Name",
                    field: "name",
                    sort: "asc",
                },
                {
                    label: "Role",
                    field: "role",
                    sort: "asc",
                },
                {
                    label: "Email",
                    field: "email",
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

        data?.users?.forEach((user) => {
            users.rows.push({
                id: user?._id,
                name: user?.name,
                role: user?.role,
                email: user?.email,
                actions: (
                    <>
                        <Link
                            to={`/admin/update_users/${user?._id}`}
                            className="btn btn-outline-primary"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Link
                            to={`/admin/users/${user?._id}/upload_images`}
                            className="btn btn-outline-success ms-2"
                        >
                            <i className="fa fa-image"></i>
                        </Link>
                        <button
                            className="btn btn-outline-danger ms-2"
                            onClick={() => deleteUserHandler(user?._id)}
                            disabled={isDeleteLoading}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });

        return users;
    };

    if (isLoading) return <Loader />;

    return (
        <main className='main-container'>
            <div className='main-title mb-3'>
                <h3>{data?.users?.length} Users</h3>
                {
                    userRole === "admin" && (
                        <NavLink to="/admin/add_user">
                            Add User
                        </NavLink>
                    )
                }
            </div>
            <div>
                <MDBDataTable
                    data={setUsers()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            </div>
        </main>
    );
};

export default NewUserList;