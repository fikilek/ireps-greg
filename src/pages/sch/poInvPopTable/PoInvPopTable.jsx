import React, { useRef, useMemo, useState, useCallback } from "react";
import "./PoInvPopTable.css";

import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

// import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
// import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
// import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "react-tippy/dist/tippy.css";
// import { Tooltip } from "react-tippy";
import PoInvPopDeleteBtn from "./PoInvPopDeleteBtn";
import PoInvPopImage from "./PoInvPopImage";
import PoInvPopEditBtn from "./PoInvPopEditBtn";

const PoInvPopTable = ({
	poData,
	setShowImage,
	setUrl,
	setAlt,
	type,
	setType,
	setShowHideInvPopForm,
	setInvPopDataToEdit,
}) => {
	const [po, setPo] = useState(poData);
	// console.log(`po`, po);

	const columns = [
		{
			field: "id",
			headerName: "Id",
			flex: 1,
			hide: true,
		},
		{
			field: "no",
			headerName: `${type} no`,
			flex: 2.5,
			headerTooltip: `${type} number`,
			// colSpan: params => 2,
		},
		{
			field: "amount",
			headerName: `amount`,
			flex: 2,
			headerTooltip: `${type} amount`,
		},
		{
			field: "url",
			headerName: `image`,
			flex: 2,
			cellRenderer: PoInvPopImage,
			cellRendererParams: {
				setShowImage,
				setUrl,
				setAlt,
				type,
				setShowHideInvPopForm,
			},
			headerTooltip: `${type} image`,
		},
		{
			field: "Edit",
			headerName: ``,
			flex: 1,
			cellRenderer: PoInvPopEditBtn,
			cellRendererParams: {
				po,
				setPo,
				type,
				setShowHideInvPopForm,
				setInvPopDataToEdit,
				setType,
			},
			sortable: false,
			filter: false,
			resizable: false,
			editable: false,
			tooltipValueGetter: p => `Click to Edit `,
		},
		{
			field: "Del",
			headerName: ``,
			flex: 1.5,
			cellRenderer: PoInvPopDeleteBtn,
			cellRendererParams: { po, setPo, type },
			sortable: false,
			filter: false,
			resizable: false,
			editable: false,
			tooltipValueGetter: p => `Click to delete`,
		},
	];
	// const { poPi } = po.poPi;
	let poInvPopData = [];
	if (type === "invoice") {
		poInvPopData = JSON.parse(JSON.stringify(po.poData.poInv));
	}
	if (type === "payment") {
		poInvPopData = JSON.parse(JSON.stringify(po.poData.poPop));
	}
	// console.log(`poInvPopData`, poInvPopData);
	// console.log(`po`, po)

	const gridRef = useRef();
	const [rowData, setRowData] = useState(poInvPopData);
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
		return params => params.data.id;
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

			const newPoPi = poInvPopData.map(oldItem => {
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
		[po, poInvPopData, setPo]
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
				rowSelection="single" // Options - allows click selection of rows
				// onCellClicked={addItems}
				domLayout={"autoHeight"}
				getRowId={getRowId}
				// onCellValueChanged={onCellValueChanged}
				// readOnlyEdit={true}
				// onCellEditRequest={onCellEditRequest}
				enableCellChangeFlash={true}
			/>
		</div>
	);
};

export default PoInvPopTable;

// TODO: mouse over tips on the table skipHeader
// TODO: do tooltips
