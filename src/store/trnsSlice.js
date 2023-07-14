import { createSlice } from "@reduxjs/toolkit";
import { trnsData } from "../data/trnsData/trnsData";

const trnsSlice = createSlice({
	name: "trns",
	initialState: trnsData, 
	reducers: {
		trnCreated: (state, action) => {},
		trnUpdated: (state, action) => {},
		trnDeleted: (state, action) => {},
	},
});

export const { trnCreated, trnUpdated, trnDeleted } = trnsSlice.actions;

export default trnsSlice.reducer;
