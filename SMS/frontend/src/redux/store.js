import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice";

import { studentApi } from "./api/studentsApi";
import { teacherApi } from "./api/teachersApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { courseApi } from "./api/courseApi";
import { gradeApi } from "./api/gradeApi";
import { quizApi } from "./api/quizApi";

export const store = configureStore({
    reducer: {
    
        auth: userReducer,

        [studentApi.reducerPath]: studentApi.reducer,
        [teacherApi.reducerPath]: teacherApi.reducer,

        [courseApi.reducerPath]: courseApi.reducer,
        [gradeApi.reducerPath]: gradeApi.reducer,
        [quizApi.reducerPath]: quizApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            studentApi.middleware,
            teacherApi.middleware,
            courseApi.middleware,
            gradeApi.middleware,
            quizApi.middleware,
            authApi.middleware,
            userApi.middleware,

        ]),
});
