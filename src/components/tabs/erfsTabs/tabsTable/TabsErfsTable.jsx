import React, { useRef, useMemo, useState } from "react";
import "./tabsErfsTable.css";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import Table from "../../../table/Table";
import TableAddRecordBtn from "../../../table/tableBtns/TableAddRecordBtn";
import TableWrapper from "../../../table/TableWrapper";

const showTableAddRecordBtn = (ml1, ml2, ml3, nfd, fn) => {
	if (ml1 === "asts" || ml1 === "trns" || ml1 === "erfs") return null;
	return <TableAddRecordBtn nfd={nfd} fn={fn} />;
};

const TabsErfsTable = props => {
	// console.log(`props`, props);
	const { ml1, tn, ml3, nfd, fn, rowData, columnDefs, setSelectedRows } = props;

	return (
		<>
			<TableWrapper rowData={rowData} columnDefs={columnDefs} ml1={ml1}>
				<Table
					rowData={rowData}
					columnDefs={columnDefs}
					setSelectedRows={setSelectedRows}
					ml1={ml1}
				/>
			</TableWrapper>

			{showTableAddRecordBtn(ml1, tn, ml3, nfd, fn)}
		</>
	);
};

export default TabsErfsTable;

// TODO: mouse over tips on the table skipHeader
