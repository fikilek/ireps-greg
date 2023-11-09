import React, { useRef, useMemo, useState } from "react";
import "./Table.css";

import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import "react-tippy/dist/tippy.css";
import { useCallback } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

// import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
// import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

// import PoTooltip from "./PoTooltip";

const TableCheckedInAsts = props => {
	// console.log(`props`, props)
	const { rowData, columnDefs, setSelectedRows, trn } = props;
	// console.log(`rowData`, rowData);
	// console.log(`columnDefs`, columnDefs);

	// destructire trnState from trn
	// const { trnState } = trn.metaData
	// console.log(`trnState`, trnState)

	// extract the trn state
	const ts = trn?.metaData.trnState;
	// console.log(`ts`, ts);

	// extract the trn type
	const tt = trn?.metaData.trnType;
	// console.log(`tt`, tt);

	const gridRef = useRef();

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			floatingFilter: true,
			// tooltipComponent: PoTooltip,
			suppressMovable: true,
		}),
		[]
	);

	const onSelectionChanged = event => {
		// console.log(`selected rows`, event.api.getSelectedRows());
		setSelectedRows && setSelectedRows(event.api.getSelectedRows());
	};

	const onGridReady = params => {
		// console.log(`params`, params);

		// destructure column api
		const { columnApi } = params;
		// console.log(`columnApi`, columnApi);

		// hide column

		if (
			(tt === "installation" && ts === "submited") ||
			tt === "commissioning" ||
			tt === "audit"
		) {
			columnApi.setColumnVisible("Chck Out", false);
		}
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
				onGridReady={onGridReady}
			></AgGridReact>
		</div>
	);
};

export default TableCheckedInAsts;

// TODO: mouse over tips on the Table skipHeader
