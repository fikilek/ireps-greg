import { createSlice } from "@reduxjs/toolkit";
import { astsData, astsTestData } from "../data/astsData/astsData";

const astsSlice = createSlice({
	name: "asts",
	initialState: { astsData, astsTestData },
	reducers: {
		astCreated: (state, action) => {
			state.astsData.push(action.payload);
		},
		astUpdated: (state, action) => {},
		astDeleted: (state, action) => {},
		astTestDataCreated: (state, action) => {
			console.log(`astTestDataCreated running`);
			console.log(`state`, state);
			console.log(`state.astsTestData`, state.astsTestData);
			console.log(`action`, action);
			// return {
			// 	...state,
			// 	astsTestData: [...astsTestData, action.payload],
			// };

			state.astsTestData.push(action.payload)
		},
	},
});

// console.log(`astsSlice`, astsSlice)

export const { astCreated, astUpdated, astDeleted, astTestDataCreated } =
	astsSlice.actions;

export default astsSlice.reducer;
