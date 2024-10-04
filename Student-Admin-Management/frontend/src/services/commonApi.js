import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) =>({
        url : "/api/login",
        method : "POST",
        body : credentials,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          } 
      } ),
    }),
  }),
})


export const { useLoginMutation } = commonApi