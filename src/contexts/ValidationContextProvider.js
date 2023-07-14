import React, { useEffect, useReducer, useState } from "react";
import { createContext } from "react";
import { auth } from "../firebaseConfig/fbConfig";
import { useAstCategories } from "../hooks/useAstCategories";

const trnFormValidationReducer = (state, action) => {
	// console.log(`validationReducer state`, state);
	// console.log(`action`, action);

	switch (action.type) {
		case "ADD_VALIDATION_OBJECT":
			// console.log(`ADD_VALIDATION_OBJECT`, action.payload);
			const { astCat, astCatIndex, trnValidationData } = action.payload;
			// console.log(`**********************************************`);
			// console.log(`astCat`, astCat);
			// console.log(`astCatIndex`, astCatIndex);
			// console.log(`trnValidationData`, trnValidationData);
			// console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);

			const validationObj = {
				trnValidationData: trnValidationData,
			};

			return {
				...state,
				astData: {
					...state.astData,
					[astCat]: [
						...state.astData[astCat],
						(state.astData[astCat][astCatIndex] = validationObj),
					],
				},
			};

		case "UPDATE_FIELD_VALIDATION_VERDICT":
			// console.log(`UPDATE_FIELD_VALIDATION_VERDICT`, action.payload);
			const { verdict, pathArray, newValidationObject } = action.payload;
			// console.log(`newValidationObject`, newValidationObject);
			// console.log(`pathArray`, pathArray);

			// astData[meter][0].trnData.meterInstallation.location.exactLocation
			//     0     1    2    3            4            5        6

			// extract trnValidationData
			const tvd = newValidationObject.astData[pathArray[1]][pathArray[2]];
			// console.log(`tvd`, tvd);

			// update tvd (trnValidatioData) with the new verdict
			const newTvd = {
				...tvd,
				trnValidationData: {
					...tvd.trnValidationData,
					[pathArray[4]]: {
						...tvd.trnValidationData[pathArray[4]],
						[pathArray[5]]: {
							...tvd.trnValidationData[pathArray[4]][pathArray[5]],
							[pathArray[6]]: {
								...tvd.trnValidationData[pathArray[4]][pathArray[5]][pathArray[6]],
								verdict: verdict,
							},
						},
					},
				},
			};
			// console.log(`newTvd`, newTvd);
			// console.log(`pathArray[2]`, pathArray[2]);
			// console.log(`pathArray[3]`, pathArray[3]);
			// console.log(`pathArray[4]`, pathArray[4]);
			// console.log(`pathArray[5]`, pathArray[5]);
			// console.log(`pathArray[6]`, pathArray[6]);

			return {
				...state,
				astData: {
					...state.astData,
					[pathArray[1]]: state[pathArray[0]][pathArray[1]].with(
						pathArray[2],
						newTvd
					),
				},
			};

		case "CLEAR_VALIDATION_OBJECTS":
			// console.log(`CLEAR_VALIDATION_OBJECTS`);
			return {
				...state,
				astData: {},
			};

		case "UPDATE_WHOLE_VALIDATION_OBJECT":
			console.log(`UPDATE_WHOLE_VALIDATION_OBJECT`);
			console.log(`action.payload`, action.payload);
			return state;

		default:
			return state;
	}
};

const getInitValidationObject = astCategoriesArray => {
	return (
		astCategoriesArray &&
		astCategoriesArray.map(cat => {
			// console.log(`cat`, cat);
			const astData = {};
			return { ...astData, [`${cat}`]: [] };
		})
	);
};

export const ValidationContext = createContext();

const ValidationContextProvider = ({ children }) => {
	// console.log(`ValidationContextProvider`, children);

	// get ast categories array
	const { astCategoriesArray } = useAstCategories();
	// console.log(`astCategoriesArray`, astCategoriesArray);

	// create initi validation object state
	const [initValidationObj, setInitValidationObj] = useState({});
	// console.log(`initValidationObj`, initValidationObj);

	const [validationObject, dispatch] = useReducer(
		trnFormValidationReducer,
		initValidationObj
	);
	// console.log(`validationObject`, validationObject);

	useEffect(() => {
		// create initial validation object
		const initValObj = getInitValidationObject(astCategoriesArray);
		// console.log(`initValObj`, initValObj);
		setInitValidationObj(initValObj);
	}, [astCategoriesArray]);

	return (
		<ValidationContext.Provider value={{ validationObject, dispatch }}>
			{children}
		</ValidationContext.Provider>
	);
};

export default ValidationContextProvider;
