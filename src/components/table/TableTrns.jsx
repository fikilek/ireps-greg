import React, { useRef, useMemo, useState } from "react";
import "./Table.css";

import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import "react-tippy/dist/tippy.css";
import TableTrnsForAstsTooltip from "./TableTrnsForAstsTooltip";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
// import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
// import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

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
			suppressMovable: true,
		}),
		[]
	);

	return (
		// <div style={{ height: "60vh", width: "60rem" }} className="ag-theme-alpine">
		<div style={{ height: "60vh" }} className="ag-theme-alpine table-trns-config">
			<AgGridReact
				ref={gridRef} // Ref for accessing Grid's API
				rowData={rowData} // Row Data for Rows
				columnDefs={columnDefs} // Column Defs for Columns
				defaultColDef={defaultColDef} // Default Column Properties
				animateRows={true} // Optional - set to 'true' to have rows animate when sorted
				suppressRowClickSelection={true}
				// rowSelection="multiple" // Options - allows click selection of rows
			/>
		</div>
	);
};

export default TableTrns;

// TODO: mouse over tips on the TableTrns skipHeader
