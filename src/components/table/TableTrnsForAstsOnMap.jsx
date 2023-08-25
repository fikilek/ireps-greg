import React from "react";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import Table from "./Table";
import "./Table.css";

// This component show all transactions for a particular ast
const TableTrnsForAstsOnMap = props => {
	// console.log(`TableAstsInErfMap props`, props);

	const { tableFields: columnDefs } = useColumnDefs({ ml1: "trnsInErfMap" });
	// console.log(`columnDefs`, columnDefs);

	// get columnDefs from porps
	const { rowData } = props;
	// console.log(`rowData`, rowData);


	return (
		<div className={`table`}>
			<Table rowData={rowData} columnDefs={columnDefs} />
		</div>
	);
};
export default TableTrnsForAstsOnMap;
