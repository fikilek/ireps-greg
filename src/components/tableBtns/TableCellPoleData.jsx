import React from "react";

const TableCellPoleData = (params ) => {
	// console.log(`params`, params);
	return (
		<>
			<span>{`L:${params.value.length} - `}</span>
			<span>{`L:${params.value.diameter}`}</span>
		</>
	);
};

export default TableCellPoleData;
