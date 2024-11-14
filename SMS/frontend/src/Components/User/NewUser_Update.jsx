import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
    useGetUserDetailsQuery,
    useUpdateUserMutation
} from "../../redux/api/userApi";

const UpdateNewUser = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "",
        password: ""
    });

    const { name, email, role, password } = user;

    const [updateUser, { isLoading, error, isSuccess }] =
     useUpdateUserMutation();

    const { data, isLoading: userLoading, isError: userError, refetch } = useGetUserDetailsQuery(params?.id);

    useEffect(() => {
        if (data) {
            setUser(data.user);
        }
        if (userError) {
            toast.error(userError.message);
        }
        if (isSuccess) {
            toast.success("User updated");
            navigate("/admin/user_list");
        }
    }, [data, userError, isSuccess, navigate]);

    useEffect(() => {
        // Fetch user data when component mounts or when params.id changes
        refetch();
    }, [refetch, params.id]);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        updateUser({ id: params?.id, body: user });
    };

    if (userLoading) return <div>Loading...</div>;
    if (userError) return <div>Error: {userError.message}</div>;

    return (
        <main className='main-container'>
            <div className='main-title mb-3'>
            </div>
            <div>
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
                            New Password
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
                        {isLoading ? "Updating..." : "UPDATE"}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default UpdateNewUser;