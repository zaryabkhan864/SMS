import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const quizApi = createApi({
    reducerPath: "quizApi",
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    tagTypes: ['Quiz'],
    endpoints: (builder) => ({
        addQuizMarks: builder.mutation({
            query(body) {
                return {
                    url: "/addQuizMarks",
                    method: "POST",
                    body,
                };
            }
        }),
        getCourseByGrade: builder.query({
            query: (id) => `/course_by_id/${id}`,
            providesTags: ['Quiz']
        }),

        // getQuizResult: builder.query({
        //     query: (id) => `/getQuizResult/${id}`,
        //     providesTags: ['Quiz']
        // }),
        getQuizResult: builder.query({
            query: ({ gradeId, semester, term, quizNumber }) => {
                console.log("What data is in api", gradeId, semester, term, quizNumber);
                return `/getQuizResult?gradeId=${gradeId}&semester=${semester}&term=${term}&quizNumber=${quizNumber}`;
            },
            providesTags: ['Quiz']
        }),
        updateQuiz: builder.mutation({
            query({ id, body }) {
                console.log("What data is in api update", id, body)
                return {
                    url: `/update_quiz/${id}`,
                    method: "PUT",
                    body: { data: body } // Wrap body inside an object
                }
            }
        }),

    })
});
export const { 
    useGetCourseByGradeQuery,
    useGetQuizResultQuery,
    useUpdateQuizMutation,
    useAddQuizMarksMutation } = quizApi;