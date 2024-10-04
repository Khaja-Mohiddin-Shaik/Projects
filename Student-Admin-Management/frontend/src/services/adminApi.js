import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    studentsDetails: builder.query({
      query: (student) => ({
        url: `/api/admin/studentsList/${student.branch}/${student.year}`,
        method: "GET",
      }),
    }),
    adminDetails: builder.query({
      query: (userId) => ({
        url: `/api/admin/adminDetails/${userId}`,
        method: "GET",
      }),
    }),
    getOneStudent: builder.query({
      query: (student) => ({
        url: `/api/admin/getOneStudent/${student.branch}/${student.studentId}`,
        method: "GET",
      }),
    }),
    updateStudentDetail: builder.mutation({
      query: (data) => ({
        url: `/api/admin/studentDetailUpdate/${data.branch}/${data.userId}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      }),
    }),
    updateAdminDetail: builder.mutation({
      query: (data) => ({
        url: `/api/admin/adminDetailUpdate/${data.userId}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      }),
    }),
    getStudentFees: builder.query({
      query: (data) => ({
        url: `/api/admin/getStudentFees/${data.branch}/${data.studentId}`,
        method: "GET",
      }),
    }),
    updateStudentFees: builder.mutation({
      query: ({ branch, studentId, sem, fees }) => ({
        url: `/api/admin/updateStudentFees/${branch}/${studentId}`,
        method: 'PATCH',
        body: { studentId, sem, fees },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getTimetable: builder.query({
      query: ( {branch, year, sem} ) => ({
        url: `/api/admin/getTimetable/${branch}/${year}/${sem}`,
        method: 'GET',
      }),
    }),
    updateTimetable: builder.mutation({
      query: ({ branch, year,sem, timetable }) => ({
        url: `/api/admin/updateTimetable/${branch}/${year}/${sem}`,
        method: 'PATCH',
        body: timetable,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getFacultyDetails: builder.query({
      query: ({branch, year, sem}) => ({
        url: `/api/admin/getFacultyDetails/${branch}/${year}/${sem}`,
        method: 'GET',
      }),
    }),
    updateFacultyDetails: builder.mutation({
      query: ({ branch, year,sem, facultyDetails }) => ({
        url: `/api/admin/updateFacultyDetails/${branch}/${year}/${sem}`,
        method: 'PATCH',
        body: facultyDetails,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getStudentResult: builder.query({
      query: ({ branch, studentId}) => ({
        url: `/api/admin/getStudentResult/${branch}/${studentId}`,
        method: 'GET',
      }),
    }),
    updateStudentResult: builder.mutation({
      query: ({ branch, studentId, year, sem, results }) => ({
        url: `/api/admin/updateStudentResult/${branch}/${studentId}/${year}/${sem}`,
        method: 'PATCH',
        body: results,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
})

export const { 
  useStudentsDetailsQuery, 
  useAdminDetailsQuery, 
  useGetOneStudentQuery, 
  useUpdateStudentDetailMutation, 
  useUpdateAdminDetailMutation,
  useGetStudentFeesQuery, 
  useUpdateStudentFeesMutation, 
  useGetTimetableQuery, 
  useUpdateTimetableMutation,
  useGetFacultyDetailsQuery,
  useUpdateFacultyDetailsMutation,
  useGetStudentResultQuery,
  useUpdateStudentResultMutation
} = adminApi
