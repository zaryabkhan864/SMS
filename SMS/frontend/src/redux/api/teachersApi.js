import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Teacher", "AdminTeachers", "Reviews"],
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => "/teachers"

    }),
    getTeacherDetails: builder.query({
      query: (id) => `/teachers/${id}`,
      providesTags: ["Teacher"],
    }),

    createTeacher: builder.mutation({
      query(body) {
        return {
          url: "/admin/teachers",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AdminTeachers"],
    }),
    updateTeacher: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/teachers/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Teacher", "AdminTeachers"],
    }),

    deleteTeacher: builder.mutation({
      query(id) {
        return {
          url: `/admin/teachers/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminTeachers"],
    }),

  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherDetailsQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  // useUploadProductImagesMutation,
  // useDeleteProductImageMutation,
  useDeleteTeacherMutation,
} = teacherApi;
