import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";
import React, { useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import { PoContext } from "../../../contexts/PoContext";
import { UserContext } from "../../../contexts/UserContext";
// import "./poi.css";
import { getNewGrvComment, getNewPoi } from "./grvCommentsUtils";

const GrvCommentsBtnAddItem = params => {
	// console.log(`params`, parxms);
	const { user } = useContext(UserContext);
	// console.log(`params`, parxms);
	// const { newPoItem } = useSelector(state => state.admin);
	// console.log(`newPoItem.itemId`, newPoItem.itemId)

	const getRowData = useCallback(() => {
		const rowData = [];
		params.api.forEachNode(function (node) {
			rowData.push(node.data);
		});
		params.setPo({
			...params.po,
			poData: {
				...params.po.poData,
				poGrv: {
					...params.po.poData.poGrv,
					grvComments: rowData,
				},
			},
		});
	}, []);

	const handleAddItem = e => {
		e.preventDefault();
		const newGrvComment = getNewGrvComment();
		console.log(`newGrvComment`, newGrvComment);
		const grvComment = newGrvComment.map(comment => {
			return {
				...comment,
				grvCommentDate: moment(new Date()).format("YY/MM/DD HH:mm"),
				grvCommentUserName: `${user.surname} ${user.name}`,
			};
		});
		const res = params.api.applyTransaction({
			add: grvComment,
			addIndex: 0,
		});
		getRowData();
	};

	return (
		<button
			type="button"
			className="btnPoi btnGrvCommentsBtnAddItem"
			onClick={handleAddItem}
		>
			+
		</button>
	);
};

export default GrvCommentsBtnAddItem;
