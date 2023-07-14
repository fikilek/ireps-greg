import { createSlice } from "@reduxjs/toolkit";
import { unpData, unpRoles, unpStates } from "../data/adminData/adminData";

const authSlice = createSlice({
	name: "auth",
	initialState: unpData,
	reducers: {
		userSignedin: (state, action) => {},
		userSignedout: (state, action) => {},
		userSigednup: (state, action) => {},
		userUpdated: (state, action) => {},
		userDeleted: (state, action) => {},
	},
});

export const { userSignedin, userSignedout, userSigednup, userCreated, userUpdated, userDeleted } = authSlice.actions;

export default authSlice.reducer;
