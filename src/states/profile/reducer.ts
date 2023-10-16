import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    account: '',
    token: '',
    address: '',
    createdAt: '',
    deletedAt: '',
    email: '',
    faculty: 'IT',
    isSendVerify: false,
    isVerified: false,
    name: '',
    role: '',
    student_id: null,
    updatedAt: '',
    isClaimed: true,
  },
  reducers: {
    SETPROFILE: (state, action) => {
      Object.assign(state, action.payload);
    },
    LOGIN: (state, action) => {
      state.account = action.payload.account;
      state.token = action.payload.token;
    },
    SETTOKEN: (state, action) => {
      state.token = action.payload;
    },
    LOGOUT: (state) => {
      state.account = '';
      state.token = '';
    },
  },
});
export default profileSlice.reducer;
