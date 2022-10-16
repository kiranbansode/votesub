import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserRole {
    role: string;
}

const initialState: IUserRole = {
    role: '',
};

const saveUserRoleSlice = createSlice({
    name: 'userRole',
    initialState,
    reducers: {
        SAVE_USER_ROLE: (state, action: PayloadAction<any>) => {
            state.role = action.payload.role;
        },

        RESET_USER_ROLE: (state) => {
            state.role = '';
        },
    },
});

export const { SAVE_USER_ROLE, RESET_USER_ROLE } = saveUserRoleSlice.actions;

export default saveUserRoleSlice.reducer;
