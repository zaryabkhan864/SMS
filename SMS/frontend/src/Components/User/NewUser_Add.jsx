import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/api/authApi";
import { useGetAdminUsersQuery } from "../../redux/api/userApi";

const NewUser_Add = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const { name, email, password, role } = user;
    const navigate = useNavigate();
    const { refetch: refetchUsers } = useGetAdminUsersQuery(); // Import refetch function

    const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success("User Added...");
            navigate("/admin/user_list");
            refetchUsers(); // Trigger refetch after successful user addition
        }
    }, [error, isSuccess]);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const signUpData = {
            name,
            email,
            password,
            role,
        };

        register(signUpData);
    };

    return (
        <main className='main-container'>
            <div className='main-title mb-3'>
                <h3>New User</h3>
            </div>
            <form className="shadow rounded bg-body p-5" onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="name_field" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name_field"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={onChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email_field" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password_field" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="role_field" className="form-label">
                        Role
                    </label>
                    <select
                        className="form-select"
                        id="role_field"
                        name="role"
                        onChange={onChange}
                        value={role}
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>
                </div>

                <button
                    id="register_button"
                    type="submit"
                    className="btn w-100 py-2"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "REGISTER"}

                </button>
            </form>
        </main>
    );
}

export default NewUser_Add;