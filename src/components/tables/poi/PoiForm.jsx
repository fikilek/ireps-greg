import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PoContext } from "../../../contexts/PoContext";
import "./poi.css";

const getItemValues = poi => {
	let poiItems = {
		itemName: '',
		itemCode: '',
		itemQuantity: 0,
	}
	return {
		...poiItems,
		itemName: poi['itemName'].poiValue,
		itemCode: poi['itemCode'].poiValue,
		itemQuantity: poi['itemQuantity'].poiValue,
	} 
}

const poiFormData = {
	itemName: { poiName: "itemName", poiValue: "", poiPlaceHolder: "item name" },
	itemCode: { poiName: "itemCode", poiValue: "", poiPlaceHolder: "item code" },
	itemQuantity: {
		poiName: "itemQuantity",
		poiValue: 0,
		poiPlaceHolder: "item quantity",
	},
};

const PoiForm = () => {
	const { setPoItemsInContext } = useContext(PoContext);
	// console.log(`newPoiFormdata`, newPoiFormData);
	const [poItems, setPoItems] = useState(poiFormData);
	// console.log(`poItems`, poItems);

	const handleSubmit = e => {
		e.preventDefault();
		// console.log(`poItems`, poItems);
		const poi = getItemValues(poItems);
		// console.log(`poi`, poi);
		setPoItemsInContext(prev => {
			return [...prev, poi];
		});
		setPoItems(poiFormData);
	};

	const handleChange = e => {
		// console.log(`e.target.name`, e.target.name);
		// console.log(`e.target.value`, e.target.value);
		// console.log(`poItems`, poItems);
		setPoItems(prev => {
			return {
				...prev,
				[e.target.name]: {
					...prev[e.target.name],
					poiValue: e.target.value,
				},
			};
		});
	};

	// console.log(`poItems`, poItems);

	return (
		<div className="poiForm">
			<div className="piComponentInput">
				<input
					type="text"
					name={poItems.itemName.poiName}
					value={poItems.itemName.poiValue}
					onChange={handleChange}
					placeholder={poItems.itemName.poiPlaceHolder}
				/>
			</div>
			<div className="piComponentInput">
				<input
					type="text"
					name={poItems.itemCode.poiName}
					value={poItems.itemCode.poiValue}
					onChange={handleChange}
					placeholder={poItems.itemCode.poiPlaceHolder}
				/>
			</div>
			<div className="piComponentInput">
				<input
					type="text"
					name={poItems.itemQuantity.poiName}
					value={poItems.itemQuantity.poiValue}
					onChange={handleChange}
					placeholder={poItems.itemQuantity.poiPlaceHolder}
				/>
			</div>

			<div className="poiFormBtn">
				<button type="button" onClick={handleSubmit}>
					+
				</button>
			</div>
		</div>
	);
};

export default PoiForm;
