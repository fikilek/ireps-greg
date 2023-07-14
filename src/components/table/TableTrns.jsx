import React, { useRef, useMemo, useState } from "react";
import "./Table.css";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";
import TableTrnsForAstsTooltip from "./TableTrnsForAstsTooltip";
// import PoTooltip from "./PoTooltip";

const TableTrns = ({ rowData, columnDefs }) => {
	// console.log(`rowData`, rowData);
	// console.log(`columnDefs`, columnDefs);

	const gridRef = useRef();

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			floatingFilter: true,
			tooltipComponent: TableTrnsForAstsTooltip,
		}),
		[]
	);

	return (
		<div style={{ height: "60vh", width: "50vw" }} className="ag-theme-alpine">
			<AgGridReact
				ref={gridRef} // Ref for accessing Grid's API
				rowData={rowData} // Row Data for Rows
				columnDefs={columnDefs} // Column Defs for Columns
				defaultColDef={defaultColDef} // Default Column Properties
				animateRows={true} // Optional - set to 'true' to have rows animate when sorted
				suppressRowClickSelection={true}
			/>
		</div>
	);
};

export default TableTrns;

// TODO: mouse over tips on the TableTrns skipHeader
