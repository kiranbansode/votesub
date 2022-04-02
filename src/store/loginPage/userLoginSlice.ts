import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserLoginFormTypes } from 'pages/LoginPage';
import { signInWithEmailAndPassword, UserInfo } from 'firebase/auth';
import { auth } from 'config/firebase';

export const userLogIn = createAsyncThunk(
  'user/LogIn',
  async (data: UserLoginFormTypes, { rejectWithValue }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, data.username, data.password);
      const {
        user: { uid, email },
      } = response;

      return {
        uid,
        email,
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
  loading: boolean;
};

const initialState: UserInfoType = {
  userDetails: {
    email: '',
    uid: '',
  },
  loading: false,
};

const userLoginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogIn.pending, (state) => {
      state.userDetails.uid = '';
      state.userDetails.email = '';
      state.loading = true;
    });

    /* 
      !any should not be used
      !change it to proper PayloadAction type
      may find possible solution here : https://github.com/reduxjs/redux-toolkit/pull/827
    */
    builder.addCase(userLogIn.fulfilled, (state, action: PayloadAction<any>) => {
      state.userDetails.uid = action.payload.uid;
      state.userDetails.email = action.payload.email;
      state.loading = false;
    });

    builder.addCase(userLogIn.rejected, (state) => {
      state.userDetails.uid = '';
      state.userDetails.email = null;
      state.loading = false;
    });
  },
});

export default userLoginSlice.reducer;
