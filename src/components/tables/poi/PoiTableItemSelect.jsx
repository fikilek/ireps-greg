import React, { useEffect, useState } from "react";
import { useAstCategories } from "../../../hooks/useAstCategories";
import useCollection from "../../../hooks/useCollection";

const installConfirmationOptions = [
	{ key: "", value: "choose" },
	{ key: "installed", value: "installed" },
	{ key: "not installed", value: "not installed" },
];

const PoiTableItemSelect = params => {
	const { value, po, setPo } = params;
	// console.log(`params`, params);

	// create a state for selected ast astCartegory
	const [selectedAstCat, setSelectedAstCat] = useState(value);

	// get ast categories an set up options
	const {astCategoriesOptions} = useAstCategories()

	// selected ast astCartegory
	useEffect(() => {
		const rowData = [];
		params.api.forEachNode(function (node) {
			// console.log(`node.data.itemId`, node.data.itemId);
			// console.log(`params.data.itemId`, params.data.itemId);

			if (node.data.itemId === params.data.itemId) {
				// console.log(`same`);
				rowData.push({
					...node.data,
					itemName: selectedAstCat,
				});
			} else {
				// console.log(`NOT ame`);
				rowData.push(node.data);
			}
		});

		console.log(`rowData`, rowData);

		setPo(prev => {
			// console.log(`prev`, prev);
			// console.log(`rowData`, rowData);
			// console.log(`newPoPi`, newPoPi);
			return {
				...prev,
				poPi: rowData,
			};
		});
	}, [selectedAstCat]);

	const handleChange = e => {
		// console.log(`e.target.value`, e.target.value);
		// console.log(`params.data`, params.data);
		setSelectedAstCat(e.target.value);
	};

	return (
		<div>
			<select
				value={selectedAstCat}
				onChange={handleChange}
				// placeholder="Store Name"
			>
				{astCategoriesOptions &&
					astCategoriesOptions.map(trn => {
						return (
							<option key={trn.key} value={trn.value}>
								{trn.key}
							</option>
						);
					})}
			</select>
		</div>
	);
};

export default PoiTableItemSelect;
