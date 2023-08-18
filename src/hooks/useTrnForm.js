import { flatten, unflatten } from "flat";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
// import FormikControl from "../components/forms/formComponents/formik/FormikControl";
// import FormSectionTrn from "../components/forms/formComponents/formSection/FormSectionTrn";
// import FormSectionTrnAudit from "../components/forms/formComponents/formSection/FormSectionTrnScns";
import { FormStateContext } from "../contexts/FormStateContextProvider";
// import { formSelectOptions } from "../utils/utils";
import { formSects } from "../components/forms/formComponents/formSections/formSects";
// import FormSectionTrnScns from "../components/forms/formComponents/formSection/FormSectionTrnScns";
// import FormSectionTrnAsts from "../components/forms/formComponents/formSection/FormSectionTrnAst";

const getKey = (path, cat) => {
	// console.log(`path`, path);
	// console.log(`cat`, cat);

	const hasTrnData = path.includes("trnData");

	const firstPartLength = path.split(".")[0].length;
	// console.log(`firstPartLength`, path.split(".")[0], firstPartLength);

	// const installationStr = "installation";
	const astDataStr = "astData";
	const trnDataStr = "trnData";

	if (hasTrnData) {
		const trnDataLength = trnDataStr.length;
		// console.log(`trnDataLength`, trnDataStr, trnDataLength);

		// const catLength = cat.length;
		// console.log(`catLength`, cat, catLength);

		// const lastPartLength = installationStr.length;
		// console.log(`lastPartLength`, installationStr, lastPartLength);

		const key = path.slice(firstPartLength + trnDataLength + 2);
		// console.log(`key`, key);

		return key;
	} else {
		const middlePartLength = astDataStr.length;
		// console.log(`middlePartLength`,astDataStr, middlePartLength);

		const key = path.slice(middlePartLength + firstPartLength + 2);
		return key;
	}
};

const isEqual = (arr, value) => arr.every(item => item.astVerdict === value);

const getFormState = (astVerdictArray, trn) => {
	// console.log(`astVerdictArray`, astVerdictArray);

	const allequalToNa = isEqual(astVerdictArray, "N/A");
	// console.log(`allequalToNa`, allequalToNa);
	if (allequalToNa) return "N/A";

	const includesFail = astVerdictArray.some(item => item.astVerdict === "FAIL");
	// console.log(`includesFail`, includesFail);
	if (includesFail) return "draft";

	return "valid";
};

// const getGps = (astCat, astCatIndex, trn) => {
// 	const lat =
// 		trn.astData[astCat][astCatIndex].trnData.boxInstallation.astAdr.gps.lat;
// 	const lon =
// 		trn.astData[astCat][astCatIndex].trnData.boxInstallation.astAdr.gps.lon;
// 	return { lat, lon };
// };

const updateTrn = (validationPath, value, trn, setTrn) => {
	// console.log(`validationPath`, validationPath)
	// console.log(`value`, value)
	// console.log(`trn`, trn)

	//flatten trn
	const flattenedTrn = flatten(trn, { overwrite: true });
	// console.log(`flattenedTrn`, flattenedTrn)

	// replace "[" and "]"
	const newVp = validationPath
		.replaceAll("[", ".")
		.replaceAll("]", ".")
		.replaceAll("..", ".");
	// console.log(`newVp`, newVp)

	// update the flattend trn using validationPath as the key
	flattenedTrn[newVp] = value;
	// console.log(`flattenedTrn`, flattenedTrn)

	// unflatten flattenedTrn
	const unflattenedTrn = unflatten(flattenedTrn);
	// console.log(`unflattenedTrn`, unflattenedTrn)

	setTrn(unflattenedTrn);
	return null;
};

const getAstCatIndex = (ast, trn) => {
	// get ast category from ast
	// console.log(`ast.astData`, ast.astData);
	const astCat = ast?.astData?.astCartegory;

	// get ast id
	const id = ast?.id;
	// console.log(`id`, id)

	// get index from ast cat
	const astCatIndex = trn?.astData[astCat]?.findIndex(item => item.id === id);
	// console.log(`astCatIndex`, astCatIndex);

	return astCatIndex;
};

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
			// console.log(`state`, state);
			// console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);

			if (!state.astData[astCat]) {
				state.astData[astCat] = [];
			}

			return {
				...state,
				astData: {
					...state.astData,
					[astCat]: [
						...state.astData[astCat],
						(state.astData[astCat][astCatIndex] = trnValidationData),
					],
				},
			};

		case "UPDATE_FIELD_VALIDATION_VERDICT":
			// console.log(`UPDATE_FIELD_VALIDATION_VERDICT`, action.payload);
			const {
				astCat: cat,
				astCatIndex: catIndex,
				trnValidationData: newTvd,
			} = action.payload;
			// console.log(`**********************************************`);
			// console.log(`cat`, cat);
			// console.log(`catIndex`, catIndex);
			// console.log(`newTvd`, newTvd);
			// console.log(`state`, state);
			// console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
			return {
				...state,
				astData: {
					...state.astData,
					[cat]: state.astData[cat].with(catIndex, newTvd),
				},
			};

		// return state

		case "CLEAR_VALIDATION_OBJECTS":
			// console.log(`CLEAR_VALIDATION_OBJECTS`);
			return {
				...state,
				astData: {},
			};

		case "UPDATE_WHOLE_VALIDATION_OBJECT":
			// console.log(`UPDATE_WHOLE_VALIDATION_OBJECT`);
			// console.log(`action.payload`, action.payload);
			return state;

		default:
			return state;
	}
};

export const useTrnForm = (trn, setTrn) => {
	// console.log(`trn`, trn);
	const alreadyRun = useRef(false);
	// console.log(`alreadyRun`, alreadyRun);

	// this hold the state of the form ['draft', 'submited', 'approved']
	// const [formState, setFormState] = useState({});
	const { formState, setFormState } = useContext(FormStateContext);
	// console.log(`formState`, formState);

	const [validationObject, dispatch] = useReducer(trnFormValidationReducer, {
		astData: {},
	});
	// console.log(`validationObject`, validationObject);

	const [formSections, setFormSections] = useState([]);
	// console.log(`formSections`, formSections);

	function getValidationObject(trnType, astCat, ast) {
		const { trnValidationData, astCatIndex } = getTrnFormJsx(
			trnType,
			astCat,
			ast
		);
		// console.log(`trnValidationData`, trnValidationData);
		if (trnValidationData) {
			const validationData = trnValidationData[`${astCat}Installation`];
			// console.log(`validationData`, validationData);
			return {
				astCat,
				astCatIndex,
				validationData,
			};
		} else {
			return null;
		}
	}

	const getAstData = astCat => {
		switch (astCat) {
			case "meter":
				return (
					<>
						<p>
							Phase: <span>{trn.astData.meter.phase}</span>
						</p>
						<p>
							Type: <span>{trn.astData.meter.type}</span>
						</p>
					</>
				);

			case "feeder":
				return null;

			case "pole":
				return null;

			case "box":
				return null;

			case "cb":
				return null;

			case "seal":
				return null;

			default:
				return null;
		}
	};

	// This holds all form sections jsx. When a new installation trn form is created, it does not have asts. During stores checkout, asts are assigned to the form. The checked out asts will determine which jsx in needed and these will be stored in formSections state.
	const getTrnFormJsx = (trnType, astCat, ast) => {
		const astCatIndex = getAstCatIndex(ast, trn);
		// console.log(`astCatIndex`, astCatIndex)
		// console.log(`astCat`, astCat)
		// console.log(`trnType`, trnType)
		// console.log(`getTrnFormJsx running`)

		switch (astCat) {
			case "meter":
				switch (trnType) {
					case "installation":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.meter.installation.trnData,
							trnValidationData: formSects.meter.installation.trnValidationData,
							jsx: formSects.meter.installation.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					case "commissioning":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.meter.commissioning.trnData,
							trnValidationData: formSects.meter.commissioning.trnValidationData,
							jsx: formSects.meter.commissioning.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					case "audit":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.meter.audit.trnData,
							trnValidationData: formSects.meter.audit.trnValidationData,
							jsx: formSects.meter.audit.jsx(ast, trn, astCat, astCatIndex, trnType),
						};

					case "inspection":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.meter.inspection.trnData,
							trnValidationData: formSects.meter.inspection.trnValidationData,
							jsx: formSects.meter.inspection.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					case "disconnection":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.meter.disconnection.trnData,
							trnValidationData: formSects.meter.disconnection.trnValidationData,
							jsx: formSects.meter.disconnection.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					case "reconnection":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.meter.reconnection.trnData,
							trnValidationData: formSects.meter.disconnection.trnValidationData,
							jsx: formSects.meter.reconnection.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					case "tid":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.meter.tid.trnData,
							trnValidationData: formSects.meter.tid.trnValidationData,
							jsx: formSects.meter.tid.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					default:
						return null;
				}

			case "cb":
				switch (trnType) {
					case "installation":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.cb.installation.trnData,
							trnValidationData: formSects.cb.installation.trnValidationData,
							jsx: formSects.cb.installation.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					case "commissioning":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.cb.commissioning.trnData,
							trnValidationData: formSects.cb.commissioning.trnValidationData,
							jsx: formSects.cb.commissioning.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					case "audit":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.cb.audit.trnData,
							trnValidationData: formSects.cb.audit.trnValidationData,
							jsx: formSects.cb.audit.jsx(ast, trn, astCat, astCatIndex, trnType),
						};

					case "inspection":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.cb.inspection.trnData,
							trnValidationData: formSects.cb.inspection.trnValidationData,
							jsx: formSects.cb.inspection.jsx(ast, trn, astCat, astCatIndex, trnType),
						};

					default:
						return {};
				}

			case "seal":
				switch (trnType) {
					case "installation":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.seal.installation.trnData,
							trnValidationData: formSects.seal.installation.trnValidationData,
							jsx: formSects.seal.installation.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					case "commissioning":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.seal.commissioning.trnData,
							trnValidationData: formSects.seal.commissioning.trnValidationData,
							jsx: formSects.seal.commissioning.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					case "audit":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.seal.audit.trnData,
							trnValidationData: formSects.seal.audit.trnValidationData,
							jsx: formSects.seal.audit.jsx(ast, trn, astCat, astCatIndex, trnType),
						};

					case "inspection":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.seal.inspection.trnData,
							trnValidationData: formSects.seal.inspection.trnValidationData,
							jsx: formSects.seal.inspection.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					default:
						return {};
				}

			case "box":
				switch (trnType) {
					case "installation":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.box.installation.trnData,
							trnValidationData: formSects.box.installation.trnValidationData,
							jsx: formSects.box.installation.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					case "commissioning":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.box.commissioning.trnData,
							trnValidationData: formSects.box.commissioning.trnValidationData,
							jsx: formSects.box.commissioning.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					case "audit":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.box.audit.trnData,
							trnValidationData: formSects.box.audit.trnValidationData,
							jsx: formSects.box.audit.jsx(ast, trn, astCat, astCatIndex, trnType),
						};

					case "inspection":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.box.inspection.trnData,
							trnValidationData: formSects.box.inspection.trnValidationData,
							jsx: formSects.box.inspection.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					default:
						return {};
				}

			case "pole":
				switch (trnType) {
					case "installation":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.pole.installation.trnData,
							trnValidationData: formSects.pole.installation.trnValidationData,
							jsx: formSects.pole.installation.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					case "commissioning":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.pole.commissioning.trnData,
							trnValidationData: formSects.pole.commissioning.trnValidationData,
							jsx: formSects.pole.commissioning.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					case "audit":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.pole.audit.trnData,
							trnValidationData: formSects.pole.audit.trnValidationData,
							jsx: formSects.pole.audit.jsx(ast, trn, astCat, astCatIndex, trnType),
						};

					case "inspection":
						return {
							astCat,
							astCatIndex,
							trnData: formSects.pole.inspection.trnData,
							trnValidationData: formSects.pole.inspection.trnValidationData,
							jsx: formSects.pole.inspection.jsx(
								ast,
								trn,
								astCat,
								astCatIndex,
								trnType
							),
						};

					default:
						return {};
				}
			default:
				return null;
		}
	};

	// this method validates all fields on load of the form and update the validation object via dispatch method
	const allFieldValidation = () => {
		// console.log(`validationObject`, validationObject);
		// console.log(`allFieldValidation running trn`, trn, );
		// console.log(`allFieldValidation running validationObject`, validationObject );

		// const validationObject = cloneDeep(vldnObject);
		// console.log(`validationObject`, validationObject);

		if (!validationObject) return null;
		// For all asts, prepare an array for looping to reach each ast. For this, use either. Create an array of ast categories from the validationObject
		// const astCats = validationObject.astData;
		// console.log(`astCats`, astCats);

		// const { astData } = validationObject;
		const astCatsArray = Object.keys(validationObject.astData);
		// console.log(`astCatsArray`, astCatsArray);

		// loop throug the array to validate each each field in each ast
		// for(const astCat in validationObject.astData[] )

		astCatsArray &&
			astCatsArray.forEach(cat => {
				// console.log(`cat`, cat);
				// console.log(`catIndex`, catIndex);

				// get trnValidationData array
				const tvdArray = validationObject.astData[cat];
				// console.log(`tvdArray`, tvdArray)

				if (tvdArray.length > 0) {
					// if array exist, do field validation
					// console.log(`array for ${cat} exist, thefore do field validations for the asts`,tvdArray )

					// console.log(`tvdArray`, tvdArray);
					// loop through tvdArray and get each ast validation object
					tvdArray &&
						tvdArray.forEach((tvd, index) => {
							// console.log(`tvd`, tvd);
							// console.log(`index`, index);

							// prepare trn for validation. Extract data down to "ast" Installation and flatten. Destructure tvd to get trnValidationData
							const trnVData = tvd.trnValidationData;
							// console.log(`---------------------------------------------`);
							// console.log(`cat`, cat);
							// console.log(`trnVData`, trnVData);

							// use cat and index to extract values from trn
							// console.log(`trn`, trn)
							// console.log(`cat`, cat)
							// console.log(`index`, index)
							const trnValuesData = trn.astData[cat][index].trnData;
							// console.log(`trnValuesData`, trnValuesData);

							// use cat and index to extract values from trn ast
							const trnValuesAstData = trn.astData[cat][index].astData;
							// console.log(`trnValuesAstData`, trnValuesAstData);

							// flatten both trnVData and trnValuesData
							const flattenedValidationData = flatten(trnVData, { overwrite: true });
							// console.log(`flattenedValidationData`, flattenedValidationData);
							const flattenedValuesData = flatten(trnValuesData, { overwrite: true });
							// console.log(`flattenedValuesData`, flattenedValuesData);
							const flattenedValuesAstData = flatten(trnValuesAstData, {
								overwrite: true,
							});
							// console.log(`flattenedValuesAstData`, flattenedValuesAstData);

							// combine the flattned values
							const combinedFlattendValues = {
								...flattenedValuesData,
								...flattenedValuesAstData,
							};
							// console.log(`combinedFlattendValues`, combinedFlattendValues);

							// We are now ready to do validation. Loop through the flattened flattenedValuesData object and get value. On the same loop key, get the constraint constraint, validate and update verdict. This is all happening on the flattenedValidationData object
							for (const key in combinedFlattendValues) {
								// console.log(`key`, key)

								// get the value at eavh key
								// let value = flattenedValuesData[key];
								let value = combinedFlattendValues[key];
								// console.log(`key:${key} --- value:${value}`);

								// get the constraints at each key and validate
								let requiredConstraint =
									flattenedValidationData[`${key}.constraints.0.required`];
								// console.log(`requiredConstraint`, requiredConstraint);

								requiredConstraint = requiredConstraint
									? requiredConstraint.toLowerCase()
									: "";
								if (requiredConstraint === "yes") {
									// the field is required, so it cannot be empty, the value cannot be null.
									let verdict = null;
									let vl = value.replaceAll(" ", "");
									// console.log(`value.length`, value.length);
									// console.log(`value.length === "0"`, value.length === "0");
									// console.log(`value.length === 0`, value.length === 0);
									// console.log(`value`, value);
									// console.log(`vl`, vl);
									if (
										vl.length === "0" ||
										vl.length === 0 ||
										vl === "" ||
										!vl ||
										vl === "choose"
									) {
										// there is a value, FAIL validation
										// console.log(`FAIL`);
										//update validation object
										verdict = "FAIL";
									} else {
										// there is NO value, FAIL validation
										// console.log(`PASS`);
										//update validation object
										verdict = "PASS`";
									}

									// console.log(`verdict`, verdict)
									// Update flattenedValidationData
									flattenedValidationData[`${key}.verdict`] = verdict;
									// console.log(`flattenedValidationData`, flattenedValidationData);
								}
							}

							// unflatten the validation object
							const unflattenedValidationData = unflatten(flattenedValidationData);
							// console.log(`unflattenedValidationData`, unflattenedValidationData);

							// return validation object onto its tvd
							tvd = {
								...tvd,
								trnValidationData: unflattenedValidationData,
							};
							tvd.trnValidationData = unflattenedValidationData;
							// console.log(`tvd`, tvd);

							// return trnValidationData onto its index in the cat array
							validationObject.astData[cat][index] = tvd;
							// console.log(`validationObject`, validationObject);

							dispatch({
								type: "UPDATE_WHOLE_VALIDATION_OBJECT",
								payload: { astCat: cat, astCatIndex: index, trnValidationData: tvd },
							});
						});
				}
			});

		// console.log(`validationObject`, validationObject);
	};

	const fieldValidation = (validationPath, value) => {
		// console.log(`fieldValidation method-------------------------`);
		// console.log(`validationPath`, validationPath);
		// console.log(`value`, value);
		// console.log( `validationObject`, validationObject);

		// clode validationObject
		// const newValidationObject = cloneDeep(validationObject);

		const validationPathArray = validationPath
			.replaceAll("[", ".")
			.replaceAll("]", ".")
			.replaceAll("..", ".")
			.replaceAll("trnData", "trnValidationData")
			.split(".");
		// console.log(`validationPathArray`, validationPathArray);

		const cat = validationPathArray[1];
		const catIndex = validationPathArray[2];

		const tvd = validationObject.astData[cat][catIndex].trnValidationData;
		// console.log(`tvd`, tvd);
		const { astTrackingInfo } = validationObject.astData[cat][catIndex];
		// console.log(`astTrackingInfo`, astTrackingInfo)

		const flattenedTvd = flatten(tvd, { overwrite: true });
		// console.log(`flattenedTvd`, flattenedTvd);

		// get index of trnData
		// const indexOfTrnData = validationPath.indexOf("trnData");
		// console.log(`indexOfTrnData`, indexOfTrnData);

		// extract the key to locate constraint from validation path
		// const key = validationPath.slice(indexOfTrnData + 8);
		const key = getKey(validationPath, cat);
		// console.log(`key`, key);

		// modifies key
		const modifiedKey = `${key}.constraints.0.required`;
		// console.log(`modifiedKey`, modifiedKey)

		// get the constraints at each key and validate
		let requiredConstraint = flattenedTvd[modifiedKey];
		// console.log(`requiredConstraint`, requiredConstraint);

		if (requiredConstraint === "yes") {
			// the field is required, so it cannot be empty, the value cannot be null.
			let verdict = null;
			let vl = value.replaceAll(" ", "");
			// console.log(`value.length`, value.length);
			// console.log(`value.length === "0"`, value.length === "0");
			// console.log(`value.length === 0`, value.length === 0);
			// console.log(`value`, value);
			if (
				vl.length === "0" ||
				vl.length === 0 ||
				vl === "" ||
				!vl ||
				vl === "choose"
			) {
				// there is a value, FAIL validation
				// console.log(`FAIL`);
				//update validation object
				verdict = "FAIL";
			} else {
				// there is NO value, FAIL validation
				// console.log(`PASS`);
				//update validation object
				verdict = "PASS`";
			}

			// console.log(`vercdict`, verdict);
			// Update flattenedValidationData
			flattenedTvd[`${key}.verdict`] = verdict;
			// console.log(`flattenedTvd`, flattenedTvd);

			// unflatten the validation object
			const unflattenedTvd = unflatten(flattenedTvd);
			// console.log(`unflattenedTvd`, unflattenedTvd);

			// update trn so as to sync with formik values
			updateTrn(validationPath, value, trn, setTrn);
			// console.log(`trn`, trn)

			const trnValData = {
				trnValidationData: unflattenedTvd,
				astTrackingInfo,
			};
			// console.log(`trnValData`, trnValData);
			dispatch({
				type: "UPDATE_FIELD_VALIDATION_VERDICT",
				payload: {
					astCat: cat,
					astCatIndex: catIndex,
					trnValidationData: trnValData,
				},
			});
		}
	};

	// create validation object
	const createValidationObj = async () => {
		// console.log(`creating initial validation obj`)

		if (!trn) return null;
		// console.log(`trn`, trn);
		const { astData } = trn;
		// console.log(`astData`, astData);

		// get trnType`
		const { trnType } = trn.metaData;
		// console.log(`trnType`, trnType)

		const localArray = [];
		for (const astCat in astData) {
			// console.log(`astCat`, astCat);
			const astsArray = astData[astCat];
			// console.log(`astsArray`, astsArray);
			// console.log(`validationObject`, validationObject);
			// console.log(`index`, index)
			// iterate through astsArray to create validation obj
			astsArray &&
				astsArray.forEach((ast, astCatIndex) => {
					// console.log(`ast`, ast)
					// console.log(`astCatIndex`, astCatIndex)

					// extrac ast id info
					const astId = astData[astCat][astCatIndex];
					// console.log(`astId`, astId)

					// create ast tracking info
					const astTrackingInfo = {
						id: astId.id,
						astCat: astCatIndex,
						astIndex: astCatIndex,
					};

					const trnFormJsx = getTrnFormJsx(trnType, astCat, ast);
					// console.log(`trnFormJsx`, trnFormJsx);
					const trnValidationData = {
						trnValidationData: trnFormJsx.trnValidationData,
						astTrackingInfo,
					};
					localArray.push(trnFormJsx.jsx);
					// console.log(`localArray`, localArray);
					// console.log(`trnValidationData`, trnValidationData);
					// trnValidation is now ready tot be added to the validationObj via dispatch
					dispatch({
						type: "ADD_VALIDATION_OBJECT",
						payload: { astCat, astCatIndex, trnValidationData: trnValidationData },
					});
				});
		}
		setFormSections(localArray);
	};

	// update form state based on the trn validationObject
	const updateFormState = trnType => {
		// console.log(`updateFormState running`, validationObject);

		// form state
		// let state = "valid";
		let astVerdictArray = [];

		if (!validationObject) return null;
		// For all asts, prepare an array for looping to reach each ast. For this, use either. Create an array of ast categories from the validationObject

		// const { astData } = validationObject;
		const astCatsArray = Object.keys(validationObject.astData);
		// console.log(`astCatsArray`, astCatsArray);

		// loop throug the array to validate each each field in each ast
		// for(const astCat in validationObject.astData[] )

		astCatsArray &&
			astCatsArray.forEach((cat, catIndex) => {
				// console.log(`cat`, cat);
				// console.log(`catIndex`, catIndex);

				// get trnValidationData array
				const tvdArray = validationObject.astData[cat];
				// console.log(`tvdArray`, tvdArray)

				if (tvdArray.length > 0) {
					// if array exist, do field validation
					// console.log(`array for ${cat} exist, thefore do field validations for the ast`)

					// console.log(`tvdArray`, tvdArray);
					// loop through tvdArray and get each ast validation object
					tvdArray &&
						tvdArray.forEach((tvd, index) => {
							// console.log(`tvd`, tvd);
							// console.log(`index`, index);

							// create array of fields/verdict pairs
							const astFieldsVerdictsArray = [];

							// prepare trn for validation. Extract data down to "ast"Installation and flatten. Destructure tvd to get trnValidationData
							const trnVData = tvd.trnValidationData;
							// console.log(`---------------------------------------------`);
							// console.log(`cat`, cat);
							// console.log(`trnVData`, trnVData);

							// use cat and index to extract values from trn
							const trnValuesData = trn.astData[cat][index].trnData;
							// console.log(`trnValuesData`, trnValuesData);

							// flatten both trnVData and trnValuesData
							const flattenedValidationData = flatten(trnVData, { overwrite: true });
							// console.log(`flattenedValidationData`, flattenedValidationData);

							const flattenedValuesData = flatten(trnValuesData, { overwrite: true });
							// console.log(`flattenedValuesData`, flattenedValuesData);

							// We are now ready to do validation. Loop through the flattened flattenedValuesData object and get value. On the same loop key, get the constraint constraint, validate and update verdict. This is all happening on the flattenedValidationData object

							// create ast verdict that will be updated as we iterate the fields of the ast
							let astVerdict = "PASS";

							// iterate through the ast fields. First chekc for confirmTrn (ci). If ci is "not done", no reason to do field validations, jsut store a "N/A" verdict for the ast and procedd to the validate the next ast

							// capitalize first letter of trnType
							// const capTrnType = trnType.charAt(0).toUpperCase() + trnType.slice(1);
							// console.log(`capTrnType`, capTrnType)

							// get the verdict for "ci"
							const ciVerdict =
								// flattenedValuesData[`${cat}${capTrnType}.confirmations.confirmTrn`];
								flattenedValuesData[`confirmations.confirmTrn`];
							// console.log(`ciVerdict`, ciVerdict);

							if (ciVerdict === "not done") {
								//  no reason to do field validations, jsut store a "N/A" verdict for the ast and procedd to the validate the next ast
								astVerdict = "N/A";
								astVerdictArray.push({ cat, index, astVerdict });
							} else {
								// "ci" is NOT 'notinstalled', therefore go ahead and get vedict of each each field. If nayne of the fields FAIl, then the verdict if the ast is FAIL.
								for (const key in flattenedValidationData) {
									// console.log(`key`, key)

									// get the value at eavh key
									let verdict = flattenedValidationData[key];
									// console.log(`key:${key} --- value:${verdict}`);

									// update ast verdict to FAIL is fail is encountered
									if (verdict === "FAIL") {
										astVerdict = "FAIL";
									}

									// locate each key that includes "verdict"
									if (key.includes("verdict")) {
										// console.log(`key:${key} --- value:${value}`);

										// get the value at eavh key
										let value = flattenedValuesData[key.replaceAll(`.verdict`, "")];

										// get validation vedrict for each field
										// const verdict = flattenedValidationData[key]
										// console.log(`verdict`, verdict)

										// tirm the key to include only field name (drop all other names)
										const fieldName = key
											.replaceAll(`${cat}Installation.`, "")
											.replaceAll(`.verdict`, "");
										// console.log(`fieldName`, fieldName)

										const fieldValueVerdict = { fieldName, value, verdict };
										// console.log(`fieldValueVerdict`, fieldValueVerdict)

										astFieldsVerdictsArray.push(fieldValueVerdict);
										// console.log(`fieldValueVerdict`, fieldValueVerdict)
									}
								}
								astVerdictArray.push({ cat, index, astVerdict });
							}

							// console.log(
							// 	`astFieldsVerdictsArray`,
							// 	astVerdict,
							// 	cat,
							// 	index,
							// 	astFieldsVerdictsArray,
							// 	astVerdictArray
							// );

							// update formState
							setFormState(prev => {
								// console.log(`prev`, prev)
								if (!prev[cat]) {
									prev[cat] = {};
								}
								// if (astVerdict === "FAIL") {
								// 	state = "draft";
								// }
								return {
									...prev,
									// state: state,
									[cat]: {
										...prev[cat],
										[`${cat}${index}`]: {
											// ...prev[cat][index],
											astTrackingInfo: tvd.astTrackingInfo,
											verdict: astVerdict,
											validationData: astFieldsVerdictsArray,
										},
									},
								};
							});
						});
				}
			});
		// console.log(`astVerdictArray`, astVerdictArray);

		const updatedFormSate = getFormState(astVerdictArray, trn);
		// console.log(`updatedFormSate`, updatedFormSate);

		// update formState
		setFormState(prev => {
			return {
				...prev,
				state: updatedFormSate,
			};
		});
	};

	// }
	const getNoOfAstsInTrn = () => {
		if (!trn) return null;

		// get all astCat into an array of keys
		const astsInTrn = Object.keys(trn?.astData);
		// console.log(`astsInTrn`, astsInTrn)

		// Iterate though all asts and get total asts
		const totalAstsInTrn =
			astsInTrn &&
			astsInTrn.reduce((acc, astCat) => {
				const astCatTotal = trn.astData[astCat].length;
				// console.log(`astCatTotal`, astCatTotal);

				return (acc = acc + astCatTotal);
			}, 0);
		return totalAstsInTrn;
	};

	const getNoOfAstsValObj = () => {
		if (!validationObject) return null;

		// get all astCat into an array of keys
		const astsInValObj = Object.keys(validationObject?.astData);
		// console.log(`astsInValObj`, astsInValObj)

		// Iterate though all asts and get total asts
		const totalAstsInValObj =
			astsInValObj &&
			astsInValObj.reduce((acc, astCat) => {
				const astCatTotal = trn.astData[astCat].length;
				// console.log(`astCatTotal`, astCatTotal);

				return (acc = acc + astCatTotal);
			}, 0);
		return totalAstsInValObj;
	};

	useEffect(() => {
		// console.log(`useTrnForm mounting1`, validationObject);
		// console.log(`creating validationObject`, validationObject);
		createValidationObj();
		return () => {
			// console.log(`useTrnForm unmounting1`);
		};
	}, []);

	useEffect(() => {
		// console.log(`useTrnForm mounting2`, validationObject);
		// console.log(`trn`, trn);

		const noOfAstsInTrn = getNoOfAstsInTrn();
		// console.log(`noOfAstsInTrn`, noOfAstsInTrn)

		const noOfAstsInValObj = getNoOfAstsValObj();
		// console.log(`noOfAstsInValObj`, noOfAstsInValObj)

		if (noOfAstsInTrn !== noOfAstsInValObj) {
			// console.log(`DO NOT RUN allFieldValidation`);
		} else {
			// console.log(`RUN allFieldValidation`);
			if (!alreadyRun.current) {
				// console.log(`CAN RUN allFieldValidationObject [alreadyRun]`, alreadyRun.current)
				allFieldValidation();
				alreadyRun.current = true;
			} else {
				// console.log(`CANNOT RUN allFieldValidationObject [alreadyRun]`, alreadyRun.current)
			}
			updateFormState(trn.metaData.trnType);
		}

		return () => {
			// console.log(`useTrnForm unmounting2`);
		};
	}, [validationObject]);

	return {
		// getTrnFormSection,
		getAstData,
		getTrnFormJsx,
		getValidationObject,
		formState,
		formSections,
		fieldValidation,
	};
};
