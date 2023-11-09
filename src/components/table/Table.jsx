import React, { useRef, useMemo } from "react";
import "./Table.css";

import "react-tippy/dist/tippy.css";

import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Table = props => {
	// console.log(`Table props`, props);
	const { rowData, columnDefs, setSelectedRows, ml1 } = props;

	let tableHeight = "";
	if (ml1 === "erfs") {
		tableHeight = "100%";
	} else {
		tableHeight = "95%";
	}

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
		// console.log(`selected rows`, event.api.getSelectedRows());
		setSelectedRows && setSelectedRows(event.api.getSelectedRows());
	};

	const onGridReady = params => {
		// console.log(`onGridReady params`, params);

		// destructure column api
		// const { columnApi } = params;
		// console.log(`columnApi`, columnApi);

		// api and columnApi on the gridRef object

		const { api, columnApi } = gridRef.current;
		// console.log(`api`, api);
		// console.log(`columnApi`, columnApi);

		//get viewport width
		const viewportWidth = columnApi.columnModel.viewportRight;
		// console.log(`viewportWidth`, viewportWidth);
	};

	return (
		// <div style={{ height: "calc(100% - 25px)" }} className="ag-theme-alpine">
		<div
			style={{ height: tableHeight }}
			className="ag-theme-alpine ireps-ag-table uplolad-table"
		>
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
				tooltipShowDelay={0}
				tooltipHideDelay={90000}
				pagination={true}
				paginationPageSize={4}
				paginationAutoPageSize={true}
				onGridReady={onGridReady}
			></AgGridReact>
		</div>
	);
};

export default Table;

// TODO: mouse over tips on the Table skipHeader
