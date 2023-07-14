import React, { memo, useEffect, useMemo, useState } from "react";
import useCollection from "../../hooks/useCollection";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import Table from "./Table";
import "./Table.css";
import TableAddRecordBtn from "./tableBtns/TableAddRecordBtn";

const showTableAddRecordBtn = (ml1, ml2, ml3, nfd, fn) => {
	if (ml1 === "asts" || ml1 === "trns") return null;
	return <TableAddRecordBtn nfd={nfd} fn={fn} />;
};

// Suppliers is a page component
const TableWithAddRecordBtn = props => {
	const { ml1, tn, ml3, nfd, fn } = props;

	const {
		data: rowData,
		error,
		isPending,
		success,
	} = useCollection(ml1, tn, ml3);
	// const rowData = useMemo(()=>{return data},[data])
	// console.log(`rowData`, rowData);

	const { tableFields: columnDefs } = useColumnDefs({
		ml1,
		ml2: tn,
		ml3,
	});

	// console.log(`columnDefs`, columnDefs);
	// console.log(`isPending`, isPending);
	// console.log(`success`, success);
	// console.log(`error`, error);

	return (
		<div className={`table ${tn}`}>
			<div className="table-header">
				<div className="th-menu-levels">
					<p>{`${ml1} : ${tn} : ${ml3}`}</p>
				</div>
				<div className="views">
					<button className="views-btn table-views">Table Views</button>
					<button className="views-btn views map-view">Map Views</button>
					<button className="views-btn views tree-view">Tree Views</button>
				</div>
				{/* <div className="trn-selection">
					<button>NT</button>
					<select></select>
				</div> */}
			</div>
			<Table rowData={rowData} columnDefs={columnDefs} />
			{showTableAddRecordBtn(ml1, tn, ml3, nfd, fn)}
		</div>
	);
};
export default TableWithAddRecordBtn;
