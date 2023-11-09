import React, { useRef, useMemo, useState, useCallback } from "react";
import "./poi.css";

import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

// import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
// import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
// import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import PoiBtnDeleteItem from "./PoiBtnDeleteItem";
import PoiBtnAddItem from "./PoiBtnAddItem";
import PoiTableItemSelect from "./PoiTableItemSelect";

const PoiTable = ({ po, setPo }) => {
	// console.log(`PoiTable po`, po);
	const columns = [
		{
			field: "itemId",
			headerName: "Id",
			flex: 1.5,
			hide: true,
		},
		{
			field: "itemName",
			headerName: "Name",
			flex: 3,
			headerTooltip: "Name of the item to be procured",
			colSpan: params => 2,
			cellRenderer: PoiTableItemSelect,
			cellRendererParams: { po, setPo },
		},
		{
			field: "itemAddBtn",
			flex: 1,
			headerComponent: PoiBtnAddItem,
			headerComponentParams: { po, setPo },
			headerTooltip: "Click to add a new item row.",
			sortable: false,
			filter: false,
			resizable: false,
			editable: false,
		},
		{
			field: "itemCode",
			headerName: "Code",
			flex: 3,
			headerTooltip: "Code of the item to be procured",
		},
		{
			field: "itemQuantity",
			headerName: "Quantity",
			flex: 2,
			valueParser: params => {
				// console.log(`valueParser params`, params);
				return Number(params.newValue);
			},
			headerTooltip: "Number of items to be procured",
		},
		{
			field: "Del",
			flex: 1.5,
			cellRenderer: PoiBtnDeleteItem,
			cellRendererParams: { po, setPo },
			sortable: false,
			filter: false,
			resizable: false,
			editable: false,
			tooltipValueGetter: p => "Click to delete the row",
		},
		// {
		// 	field: "Edit",
		// 	flex: 1.5,
		// 	cellRenderer: params => PoiBtnEditItem(params),
		// },
	];
	// const { poPi } = po.poPi;
	const poPiCopy = JSON.parse(JSON.stringify(po.poPi));
	// console.log(`poPiCopy`, poPiCopy);
	// console.log(`po`, po)

	const gridRef = useRef();
	const [rowData, setRowData] = useState(poPiCopy);
	const [columnDefs] = useState(columns);

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true,
			editable: true,
			suppressMovable: true,
		}),
		[]
	);

	const onCellValueChanged = useCallback(event => {
		console.log("Data after change is", event.data);
	}, []);

	const getRowId = useMemo(() => {
		return params => params.data.itemId;
	}, []);

	const onCellEditRequest = useCallback(
		event => {
			// console.log(`event`, event);
			const data = event.data;
			const field = event.colDef.field;
			const newValue = event.newValue;
			const newItem = { ...data };
			newItem[field] = event.newValue;
			// console.log("onCellEditRequest, updating " + field + " to " + newValue);

			const newPoPi = poPiCopy.map(oldItem => {
				// console.log(`-----------------------`)
				// console.log(`oldItem`, oldItem)
				// console.log(`newItem`, newItem);

				return oldItem.itemId === newItem.itemId ? newItem : oldItem;
			});

			// console.log(`newPoPi`, newPoPi);
			// console.log(`poPiCopy`, poPiCopy);
			// console.log(`po`, po);

			setRowData(newPoPi);
			setPo(prev => {
				// console.log(`prev`, prev)
				// console.log(`newPoPi`, newPoPi);
				return {
					...prev,
					poPi: newPoPi,
				};
			});
		},
		[po, poPiCopy, setPo]
	);

	return (
		<div className="ag-theme-alpine" style={{ minHeight: 80 }}>
			{/* <button>+</button> */}
			<AgGridReact
				ref={gridRef} // Ref for accessing Grid's API
				rowData={rowData} // Row Data for Rows
				columnDefs={columnDefs} // Column Defs for Columns
				defaultColDef={defaultColDef} // Default Column Properties
				animateRows={true} // Optional - set to 'true' to have rows animate when sorted
				// rowSelection="single" // Options - allows click selection of rows
				// onCellClicked={addItems}
				domLayout={"autoHeight"}
				getRowId={getRowId}
				onCellValueChanged={onCellValueChanged}
				readOnlyEdit={true}
				onCellEditRequest={onCellEditRequest}
				enableCellChangeFlash={true}
			/>
		</div>
	);
};

export default PoiTable;

// TODO: mouse over tips on the table skipHeader
