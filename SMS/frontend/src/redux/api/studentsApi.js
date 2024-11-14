import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Student", "AdminStudents", "Reviews"],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
    }),
    getStudentDetails: builder.query({
      query: (id) => `/students/${id}`,
      providesTags: ["Student"],
    }),

    createStudent: builder.mutation({
      query(body) {
        return {
          url: "/admin/students",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AdminStudents"],
    }),
    updateStudent: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/students/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Student", "AdminStudents"],
    }),
    deleteStudent: builder.mutation({
      query(id) {
        return {
          url: `/admin/students/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminStudents"],
    }),
    // uploadProductImages: builder.mutation({
    //   query({ id, body }) {
    //     return {
    //       url: `/admin/products/${id}/upload_images`,
    //       method: "PUT",
    //       body,
    //     };
    //   },
    //   invalidatesTags: ["Product"],
    // }),
    // deleteProductImage: builder.mutation({
    //   query({ id, body }) {
    //     return {
    //       url: `/admin/products/${id}/delete_image`,
    //       method: "PUT",
    //       body,
    //     };
    //   },
    //   invalidatesTags: ["Product"],
    // }),
   

  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentDetailsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  // useUploadProductImagesMutation,
  // useDeleteProductImageMutation,

} = studentApi;
