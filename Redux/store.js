import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import userReducer, { userSlice } from './userReducer';


export const store = configureStore({
  reducer: {
    counter : counterSlice,
    userDataSet: userReducer,
  },
})
