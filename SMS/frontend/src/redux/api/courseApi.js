import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    endpoints: (builder) => ({
        getCourses: builder.query({
            query: () => "/courses"

        }),
        getCourseDetails: builder.query({
            query: (id) => `/admin/courses/${id}`,
            providesTags: ["Course"],
        }),
        createCourse: builder.mutation({
            query(body) {
                return {
                    url: "/admin/courses",
                    method: "POST",
                    body,
                }
            }
        }),
        updateCourse: builder.mutation({
            query({ id, body }) {
                return {
                    url: `/admin/courses/${id}`,
                    method: "PUT",
                    body
                }
            }
        }),
        deleteCourse: builder.mutation({
            query(id) {
                return {
                    url: `/admin/courses/${id}`,
                    method: "DELETE",
                };
            },
        })
    })
});
export const {
    useGetCoursesQuery,
    useGetCourseDetailsQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    // useUploadProductImagesMutation,
    // useDeleteProductImageMutation,
    useDeleteCourseMutation,
} = courseApi;