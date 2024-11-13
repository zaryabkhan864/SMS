import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const quizApi = createApi({
    reducerPath: "quizApi",
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    tagTypes: ['Quiz'],
    endpoints: (builder) => ({
        getCourseByGrade: builder.query({
            query: (id) => `/course_by_id/${id}`,
            providesTags: ['Quiz']
        }),
        getStudentsByCourse: builder.query({
            query: (id) => `/student_by_course/${id}`,
            providesTags: ['Quiz']
        }),
        getQuizResult: builder.query({
            query: (id) => `/getQuizResult/${id}`,
            providesTags: ['Quiz']
        }),
        createQuiz: builder.mutation({
            query(body) {
                return {
                    url: "/quiz",
                    method: "POST",
                    body,
                }
            }
        }),

    })
});
export const { useGetCourseByGradeQuery,
    useGetStudentsByCourseQuery,
    useGetQuizResultQuery,
    useCreateQuizMutation, } = quizApi;