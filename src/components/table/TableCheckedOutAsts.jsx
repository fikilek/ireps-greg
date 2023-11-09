import React, { useRef, useMemo, useState } from "react";
import "./Table.css";

import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

import "react-tippy/dist/tippy.css";

import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
// import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
// import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const TableCheckedOutAsts = ({ rowData, columnDefs, setSelectedRows }) => {
	// console.log(`rowData`, rowData);
	// console.log(`columnDefs`, columnDefs);

	const gridRef = useRef();

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			floatingFilter: true,
			suppressMovable: true,
		}),
		[]
	);

	const onSelectionChanged = event => {
		setSelectedRows && setSelectedRows(event.api.getSelectedRows());
	};

	return (
		<div style={{ height: "calc(100% - 25px)" }} className="ag-theme-alpine">
			<AgGridReact
				ref={gridRef} // Ref for accessing Grid's API
				rowData={rowData} // Row Data for Rows
				columnDefs={columnDefs} // Column Defs for Columns
				defaultColDef={defaultColDef} // Default Column Properties
				animateRows={true} // Optional - set to 'true' to have rows animate when sorted
				// rowSelection="multiple" // Options - allows click selection of rows
				// enableBrowserTooltips={true}
				// rowMultiSelectWithClick={true}
				onSelectionChanged={onSelectionChanged}
			></AgGridReact>
		</div>
	);
};

export default TableCheckedOutAsts;

// TODO: mouse over tips on the Table skipHeader
