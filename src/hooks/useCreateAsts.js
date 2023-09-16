import { useState } from "react";
import { newAstFormData } from "../data/adminData/adminData";
import { timestamp } from "../firebaseConfig/fbConfig";
import useAuthContext from "./useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { Timestamp } from "firebase/firestore";

const initResponse = {
	pending: null,
	success: null,
	asts: {},
	error: "",
};

const astCartegoryData = new Map([
	[
		"meter",
		{
			phase: "", // ['single', 'three',]
			type: "", // ['conventional', 'pre-paid']
			code: "",
		},
	],
	[
		"feeder",
		{
			length: "'",
			code: "",
		},
	],
	[
		"pole",
		{
			type: "", // ['cement', 'wood', metal]
			length: "", // ['Length', 'Width', 'height']
			hasLamp: "no",
			condition: "good",
			code: "",
		},
	],
	[
		"box",
		{
			type: "", // ['metal', 'fibreglass']
			dimensions: { length: "", width: "", height: "" }, // ['Length', 'Width', 'height']
			location: "",
			code: "",
		},
	],
	[
		"cb",
		{
			size: "", 
			code: "",
		},
	],
	[
		"seal",
		{
			no: "", 
			code: "",
		},
	],
]);

export const useCreateAsts = () => {
	const [response, setResponse] = useState(initResponse);
	const { user } = useAuthContext();
	const { addDocument } = useFirestore("asts");

	const createAssets = (poi, poData) => {
		let assets = [];
		const { itemQuantity, itemName, itemCode } = poi;
		let counter = 0;
		const assetName = astCartegoryData.get(itemName);
		do {
			// update ast cartegory
			const newAst = {
				...newAstFormData,
				metaData: {
					...newAstFormData.metaData,
					createdAtDatetime: Timestamp.now(),
					createdByUser: user.displayName,
					createdByUserId: user.uid,
					updatedAtDatetime: Timestamp.now(),
					updatedByUser: user.displayName,
					createdThrough: { creator: "po", id: poData.id, creatorNo: poData.poNo },
					trnCount: [],
				},
				astData: {
					...newAstFormData.astData,
					astCartegory: itemName,
					astState: "stores",
					[itemName]: {
						...assetName,
						code: itemCode,
					},
				},
			};
			// add to firestore ast collection
			addDocument(newAst);
			counter += 1;
			assets.push({ [itemName]: newAst });
		} while (counter < itemQuantity);
		return {
			[itemName]: assets,
		};
	};

	const createAsts = poData => {
		setResponse({
			pending: true,
			success: false,
			asts: [],
			error: "",
		});

		const { poPi } = poData;
		console.log(`poPi`, poPi);

		if (poPi.length) {
			// console.log(`about to create asts`);
			let astsCreated = [];
			poPi.forEach((poi, index, array) => {
				// console.log(`poi.itemName`, poi.itemName);
				// console.log(`poi.itemQuantity`, poi.itemQuantity);
				// console.log(`typeof(poi.itemQuantity)`, typeof poi.itemQuantity);
				// console.log(`poi.itemCode`, poi.itemCode);

				astsCreated.push(createAssets(poi, poData));
				// setResponse({
				// 	...response,
				// 	asts: astsCreated,
				// });
			});

			return {
				pending: true,
				success: false,
				asts: astsCreated,
				error: "",
			};
		} else {
			setResponse({
				...response,
				error: "no po items",
			});
		}
	};
	return { createAsts, response };
};
