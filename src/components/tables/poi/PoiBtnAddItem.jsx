import React, { useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import { PoContext } from "../../../contexts/PoContext";
import "./poi.css";
import { nanoid } from "@reduxjs/toolkit";
import { getNewPoi } from "./poiUtils";

const PoiBtnAddItem = params => {
	// console.log(`params`, params);
	// const { newPoItem } = useSelector(state => state.admin);
	// console.log(`newPoItem.itemId`, newPoItem.itemId)

	const getRowData = useCallback(() => {
		const rowData = [];
		params.api.forEachNode(function (node) {
			// console.log(`node`, node)
			rowData.push(node.data);
		});

		params.setPo(prev => {
			// console.log(`prev`, prev)
			// console.log(`newPoPi`, newPoPi);
			return {
				...prev,
				poPi: rowData,
			};
		});
	}, [params]);

	const handleAddItem = e => {
		e.preventDefault();
		const res = params.api.applyTransaction({
			add: getNewPoi(),
			addIndex: 0,
		});
		getRowData();
	};

	return (
		<button
			type="button"
			className="btnPoi btnPoiBtnAddItem"
			onClick={handleAddItem}
		>
			+
		</button>
	);
};

export default PoiBtnAddItem;
