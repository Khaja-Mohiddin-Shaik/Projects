import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  oneStudentDetail: [],
}

export const oneStudentDetailSlice = createSlice({
  name: 'oneStudentDetail',
  initialState,
  reducers: {
    storeOneStudentDetail: (state, action) => {
      state.oneStudentDetail = action.payload;
    },
  },
})

export const { storeOneStudentDetail} = oneStudentDetailSlice.actions

export default oneStudentDetailSlice.reducer