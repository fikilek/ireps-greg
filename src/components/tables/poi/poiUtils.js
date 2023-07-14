import { nanoid } from "@reduxjs/toolkit";

export const getTotalQauntites = (ar, quantity) => {
	return (
		ar &&
		ar.reduce(
			(accum, current) => (accum = accum + Number(current.itemQuantity)),
			0
		)
	);
};

export const getNewPoi = () => {
const newId = nanoid();
	return [
		{
			itemId: newId,
			itemName: "",
			itemCode: "",
			itemQuantity: 0,
		},
	];
} 

export const getPoSystmeId = () => {
	const newId = nanoid()
	return newId
};