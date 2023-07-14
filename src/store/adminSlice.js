import { createSlice } from "@reduxjs/toolkit";
import {
	astStateNames,
	trnNames,
	unpData,
	unpRoles,
	unpStates,
	newTrnData,
	newPoFormData,
	newPoiFormData,
	newPoItem,
	stores,
	astCartegories,
} from "../data/adminData/adminData";

const adminSlice = createSlice({
	name: "admin",
	initialState: {
		astStateNames,
		trnNames,
		unpData,
		unpRoles,
		unpStates,
		newTrnData,
		newPoFormData,
		newPoiFormData,
		newPoItem,
		stores,
		astCartegories
	},
	reducers: {
		// create, update and delete assets state config details
		astNameCreated: (state, action) => {},
		astNameUpdated: (state, action) => {},
		astNameDeleted: (state, action) => {},
		// create, update and delete transaction names config details
		trnNameCreated: (state, action) => {},
		trnNameUpdated: (state, action) => {},
		trnNameDeleted: (state, action) => {},
		// create, update and delete unp role config details
		unpRoleCreated: (state, action) => {},
		unpRoleUpdated: (state, action) => {},
		unpRoleDeleted: (state, action) => {},
		// create, update and delete unp state config details
		unpStateCreated: (state, action) => {},
		unpStateUpdated: (state, action) => {},
		unpStateDeleted: (state, action) => {},
		// create, update and delete new trn config details
		newTrnDataConfigCreated: (state, action) => {},
		newTrnDataConfigUpdated: (state, action) => {},
		newTrnDataConfigDeleted: (state, action) => {},
	},
});

// console.log(`adminSlice`, adminSlice)

export const {
	astNameCreated,
	astNameUpdated,
	astNameDeleted,
	trnNameCreated,
	trnNameUpdated,
	trnNameDeleted,
	unpRoleCreated,
	unpRoleUpdated,
	unpRoleDeleted,
	unpStateCreated,
	unpStateUpdated,
	unpStateDeleted,
	newTrnDataConfigCreated,
	newTrnDataConfigUpdated,
	newTrnDataConfigDeleted,
} = adminSlice.actions;

export default adminSlice.reducer;
