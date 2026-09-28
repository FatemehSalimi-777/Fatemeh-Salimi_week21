import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.username = action.payload.username;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.username = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
