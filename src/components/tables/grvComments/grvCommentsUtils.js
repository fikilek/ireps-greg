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

export const getNewGrvComment = () => {
const newId = nanoid();
	return [
		{
			grvCommentId: newId,
			grvCommentUserName: "",
			grvCommentMsg: "",
			grvCommentDate: "22/11/20",
		},
	];
} 

