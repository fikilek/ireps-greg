import { useEffect, useState } from "react";
import FormikControl from "../components/forms/formComponents/formik/FormikControl";
import { useTrnForm } from "./useTrnForm";

const serviceConnectionEntryOptions = [
	{ key: "choose", value: "choose" },
	{ key: "overhead", value: "overhead" },
	{ key: "underground", value: "underground" },
];

const serviceConnectionConfigurationOptions = [
	{ key: "choose", value: "choose" },
	{ key: "A", value: "A" },
	{ key: "B", value: "B" },
	{ key: "C", value: "C" },
	{ key: "D", value: "D" },
	{ key: "E", value: "E" },
];

const yesNoOptions = [
	{ key: "choose", value: "choose" },
	{ key: "yes", value: "yes" },
	{ key: "no", value: "no" },
];

const meterDisconnectionLevelOptions = [
	{ key: "choose", value: "choose" },
	{ key: "Level 1", value: "Level 1" },
	{ key: "Level 2", value: "Level 2" },
	{ key: "Level 3", value: "Level 3" },
];

const astLocationPremisesOptions = [
	{ key: "choose", value: "choose" },
	{ key: "inside", value: "inside" },
	{ key: "outside", value: "outside" },
];

const meterTypeOptions = [
	{ key: "choose", value: "choose" },
	{ key: "pre-paid", value: "pre-paid" },
	{ key: "conventional", value: "conventional" },
];

const meterPhaseOptions = [
	{ key: "choose", value: "choose" },
	{ key: "single", value: "single" },
	{ key: "three", value: "three" },
];

const boxLocationPositionOptions = [
	{ key: "choose", value: "choose" },
	{ key: "poleBottom", value: "poleBottom" },
	{ key: "poleTop", value: "poleTop" },
	{ key: "standAlone", value: "standAlone" },
];

export const useTrnFormSections = (trn, setTrn, active, setActive) => {
	// console.log(`useTrnFormSections running`)
	// console.log(`trn`, trn)
	// console.log(`active`, active)
	// console.log(`setActive`, setActive)

	// create local state to hold the trnFormJsxArray
	const [trnFormJsxArray, setTrnFormJsxArray] = useState([]);
	// console.log(`trnFormJsxArray`, trnFormJsxArray);

	// get useTrnForm
	const { getTrnFormJsx } = useTrnForm(trn, setTrn);

	// get trnType from trn
	const { trnType } = trn.metaData;
	// console.log(`trnType`, trnType);

	// get astData from trn
	const { astData } = trn;
	// console.log(`astData`, astData);

	useEffect(() => {
		switch (trnType) {
			case "installation":
				const astCategories = Object.keys(astData);
				// console.log(`astCategories`, astCategories);

				// keep all jsx's on the local array
				const localArray = [];

				astCategories &&
					astCategories.forEach(astCat => {
						// get an array of assets form the ast cat
						const astCatArray = astData[astCat];
						// console.log(`astCatArray ${astCat}: `, astCatArray);

						// for each ast array element, create get trnForm jsx
						astCatArray.forEach(ast => {
							// console.log(`trnType`, trnType);
							const trnFormJsx = getTrnFormJsx(
								trnType,
								astCat,
								ast,
								active,
								setActive
							);
							// console.log(`trnFormJsx`, trnFormJsx);

							// push the form jsx into an array
							localArray.push(trnFormJsx);
							// console.log(`localArray`, localArray);
						});
					});

				setTrnFormJsxArray(localArray);
				break;
			// return null;
			case "inspection":
				// return null;
				break;
			case "audit":
				// return null;
				break;
			case "vending":
				// return null;
				break;
			case "disconnection":
				// return null;
				break;
			case "reconnection":
				// return null;
				break;
			case "missing":
				// return null;
				break;
			case "found":
				// return null;
				break;
			case "sale":
				// return null;
				break;
			case "returnToSeller":
				// return null;
				break;
			default:
				// return null;
				break;
		}
	}, [trn, active]);

	return { trnFormJsxArray };
};
