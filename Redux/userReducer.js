import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  usersData: {},
}


export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    userData: (state , action) => {
      state.usersData = action.payload
      // console.log("Here is your data in Reducer : " , state.usersData);
    },
  },
})

// Action creators are generated for each case reducer function
export const { userData } = userReducer.actions

export default userReducer.reducer