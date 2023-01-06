import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserRole {
    category: string;
}

const initialState: IUserRole = {
    category: '',
};

const saveUserRoleSlice = createSlice({
    name: 'userRole',
    initialState,
    reducers: {
        SAVE_USER_ROLE: (state, action: PayloadAction<any>) => {
            state.category = action.payload.category;
        },

        RESET_USER_ROLE: (state) => {
            state.category = '';
        },
    },
});

export const { SAVE_USER_ROLE, RESET_USER_ROLE } = saveUserRoleSlice.actions;

export default saveUserRoleSlice.reducer;
