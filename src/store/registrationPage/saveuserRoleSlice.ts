import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserRole {
    role: string | null;
}

const initialState: IUserRole = {
    role: null,
};

const saveUserRoleSlice = createSlice({
    name: 'userRole',
    initialState,
    reducers: {
        SAVE_USER_ROLE: (state, action: PayloadAction<string>) => {
            state.role = action.payload;
        },

        RESET_USER_ROLE: (state) => {
            state.role = null;
        },
    },
});

export const { SAVE_USER_ROLE, RESET_USER_ROLE } = saveUserRoleSlice.actions;

export default saveUserRoleSlice.reducer;
