import React, { createContext, useState } from "react";
import { useSelector } from "react-redux";
export const PoContext = createContext();

export const PoContextProvider = props => {
	const { newPoFormData, newPoiFormData } = useSelector(state => state.admin);
	// console.log(`newPoiFormData`, newPoiFormData);
	const [poData, setPoData] = useState(newPoFormData);
	const [poItemsInContext, setPoItemsInContext] = useState([]);
	// console.log(`poItemsInContext`, poItemsInContext);
	// console.log(`poData`, poData);

	const getPoiTotalQuantities = () => {
		const totals =
			poItemsInContext &&
			poItemsInContext.reduce((accum, current) => {
				return (accum = accum + Number( current.itemQuantity ) );
			}, 0);
		// console.log(`totals`, totals);
		return totals;
	};

	const poTotals = getPoiTotalQuantities();

	return (
		<PoContext.Provider
			value={{
				poData,
				setPoData,
				poItemsInContext,
				setPoItemsInContext,
				newPoiFormData,
				poTotals,
			}}
		>
			{props.children}
		</PoContext.Provider>
	);
};
