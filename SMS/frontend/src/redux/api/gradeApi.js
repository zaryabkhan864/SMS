import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
export const gradeApi = createApi({
    reducerPath: "gradeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    endpoints: (builder) => ({
        getGrades: builder.query({
            query: (params) => ({
                url: "/grades",
                params: {
                    page: params?.page,
                },
            }),
        }),
        createGrade: builder.mutation({
            query(body) {
                return {
                    url: "/admin/grades",
                    method: "POST",
                    body,
                }
            }
        }),
        updateGrade: builder.mutation({
            query({ id, body }) {
                return {
                    url: `/admin/grades/${id}`,
                    method: "PUT",
                    body
                }
            }
        }),
        deleteGrade: builder.mutation({
            query(id) {
                return {
                    url: `/admin/grades/${id}`,
                    method: "DELETE",
                };
            },
        }),
        getGradeDetails: builder.query({
            query: (id) => `/admin/grades/${id}`,
            providesTags: ["Course"],
        }),
    })
});
export const {
    useGetGradesQuery,
    useGetGradeDetailsQuery,
    useCreateGradeMutation,
    useUpdateGradeMutation,
    // useUploadProductImagesMutation,
    // useDeleteProductImageMutation,
    useDeleteGradeMutation,
} = gradeApi;