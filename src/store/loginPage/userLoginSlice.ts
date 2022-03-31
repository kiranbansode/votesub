import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userLoginFormTypes } from 'pages/LoginPage';
import { signInWithEmailAndPassword, UserInfo } from 'firebase/auth';
import { auth } from 'config/firebase';

export const userLogIn = createAsyncThunk(
  'user/LogIn',
  async (data: userLoginFormTypes, { rejectWithValue }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, data.username, data.password);

      return {
        uid: response.user.uid,
        email: response.user.email,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export type UserInfoType = {
  userDetails: {
    uid: UserInfo['uid'];
    email: UserInfo['email'];
  };
};

const initialState: UserInfoType = {
  userDetails: {
    email: '',
    uid: '',
  },
};

const userLoginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(userLogIn.pending, (state, { payload }) => {
    //   state.userDetails.uid = payload.uid || '';
    //   state.userDetails.email = payload.email || '';
    // });
    // builder.addCase(userLogIn.fulfilled, (state, { payload }) => {
    //   state.userDetails = payload;
    //   state.userDetails = payload;
    // });
    builder.addCase(userLogIn.rejected, (state) => {
      state.userDetails.uid = '';
      state.userDetails.email = '';
    });
  },
});

export default userLoginSlice.reducer;
