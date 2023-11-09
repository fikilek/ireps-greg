import React, { useRef, useMemo } from "react";
// import "./table.css";

import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

// import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
// import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
// import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

// import table fields
// import { astTableFields, trnTableFields } from "./tableFields";

const PoiTable2 = ({ rowData, columnDefs }) => {
	const gridRef = useRef(); // Optional - for accessing Grid's API
	// import table frields from useTableConfig

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			suppressMovable: true,
		}),
		[]
	);

	// console.log(`rowData`, rowData);

	return (
		// <div className={`ag-theme-alpine ${ml1 === "poi" ? "poi" : "ireps"}-table`}>

		<div
			style={{ height: "calc(100% - 25px)", width: "70rem" }}
			className={`ag-theme-alpine poi-table`}
		>
			<AgGridReact
				ref={gridRef} // Ref for accessing Grid's API
				rowData={rowData} // Row Data for Rows
				columnDefs={columnDefs} // Column Defs for Columns
				defaultColDef={defaultColDef} // Default Column Properties
				animateRows={true} // Optional - set to 'true' to have rows animate when sorted
				// rowSelection="single" // Options - allows click selection of rows
				domLayout={"autoHeight"}
			/>
		</div>
	);
};

export default PoiTable2;

// TODO: mouse over tips on the table skipHeader
