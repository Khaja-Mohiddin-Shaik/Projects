import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  adminDetails: [],
}

export const adminDetailsSlice = createSlice({
  name: 'adminDetails',
  initialState,
  reducers: {
    storeAdminDetails: (state, action) => {
      state.adminDetails = action.payload;
    },
  },
})

export const { storeAdminDetails} = adminDetailsSlice.actions

export default adminDetailsSlice.reducer