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

	const onGridReady = params => {
		// console.log(`params`, params);

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

		// get columnDefs
		const columnDefs = columnApi.columnModel.getAllGridColumns();
		// console.log(`columnDefs`, columnDefs);

		// iterare through columnDefs to detemine which columns to hide
		columnDefs?.forEach(column => {
			// get breakpoint and column name
			const field = column?.userProvidedColDef?.field;
			const breakpoint =
				column?.userProvidedColDef?.cellRendererParams?.breakpoint;
			// console.log(`START field name and breakpoint -------------`);
			// console.log(`field name`, field);
			// console.log(`breakpoint`, breakpoint);

			columnApi.columnModel.setColumnVisible("id", false);

			// breakpoints
			// 475px

			// console.log(`[${viewportWidth}] ------------------------------`);

		// 	if (viewportWidth < 475) {
		// 		console.log(
		// 			`viewpoer [${viewportWidth}] less than 475px. Use xm - extra small`
		// 		);
		// 		if (breakpoint === "xm") {
		// 			// show column
		// 			columnApi.columnModel.setColumnVisible(field, true);
		// 		} else {
		// 			// hide column
		// 			columnApi.columnModel.setColumnVisible(field, false);
		// 		}
		// 	}
		// 	if (viewportWidth > 475 && viewportWidth < 640) {
		// 		console.log(`viewport [${viewportWidth}] between than 640px and 768px`);
		// 		if (breakpoint === "xm" || breakpoint === "sm") {
		// 			// show column
		// 			columnApi.columnModel.setColumnVisible(field, true);
		// 		} else {
		// 			// hide column
		// 			columnApi.columnModel.setColumnVisible(field, false);
		// 		}
		// 	}

		// 	// 768px
		// 	if (viewportWidth > 640 && viewportWidth < 768) {
		// 		console.log(`viewport [${viewportWidth}] between than 640px and 768px`);
		// 		if (breakpoint === "xm" || breakpoint === "sm" || breakpoint === "lg") {
		// 			// show column
		// 			columnApi.columnModel.setColumnVisible(field, true);
		// 		} else {
		// 			// hide column
		// 			columnApi.columnModel.setColumnVisible(field, false);
		// 		}
		// 	}

		// 	// 1024px
		// 	if (viewportWidth > 768 && viewportWidth < 1024) {
		// 		console.log(`viewpor [${viewportWidth}]t  between than 768px and 1024px`);
		// 	}

		// 	// 1280px
		// 	if (viewportWidth > 1024 && viewportWidth < 1280) {
		// 		console.log(`viewport between than 1024px and 1280px`);
		// 	}

		// 	// 1536px
		// 	if (viewportWidth > 1280 && viewportWidth < 1536) {
		// 		console.log(`viewport [${viewportWidth}] between than 1280px and 1536px`);
		// 	}

		// 	// 1536px
		// 	if (viewportWidth > 1536) {
		// 		console.log(`viewport [${viewportWidth}] greater than 1536px`);
		// 	}
		});
	};

	const myListener = () => {
		// api and columnApi on the gridRef object
		const { api, columnApi } = gridRef.current;
		console.log(`api`, api);
		console.log(`columnApi`, columnApi);
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
