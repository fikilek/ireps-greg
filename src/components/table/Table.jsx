import React, { useRef, useMemo, useState } from "react";
import "./Table.css";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";
// import PoTooltip from "./PoTooltip";

const Table = ({ rowData, columnDefs, setSelectedRows }) => {
	// console.log(`rowData`, rowData);
	// console.log(`columnDefs`, columnDefs);

	const gridRef = useRef();

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			floatingFilter: true,
		}),
		[]
	);

	const onSelectionChanged = event => {
		// console.log(`selected rows`, event.api.getSelectedRows());
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
				rowSelection="multiple" // Options - allows click selection of rows
				// enableBrowserTooltips={true}
				// rowMultiSelectWithClick={true}
				onSelectionChanged={onSelectionChanged}
				tooltipShowDelay={0}
				tooltipHideDelay={90000}
			></AgGridReact>
		</div>
	);
};

export default Table;

// TODO: mouse over tips on the Table skipHeader
