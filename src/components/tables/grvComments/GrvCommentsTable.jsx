import React, { useRef, useMemo, useState, useCallback } from "react";
// import "./poi.css";

import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

import "react-tippy/dist/tippy.css";
// import PoiBtnDeleteItem from "./PoiBtnDeleteItem";
import GrvCommentsBtnAddItem from "./GrvCommentsBtnAddItem";

import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GrvCommentsTable = ({ po, setPo }) => {
	const columns = [
		{
			field: "grvCommentId",
			headerName: "Id",
			flex: 1.5,
			hide: true,
		},
		{
			field: "grvCommentUserName",
			headerName: "User Name",
			flex: 2,
			headerTooltip: "Name of user commenting",
			colSpan: params => 2,
		},
		{
			field: "grvCommentAddBtn",
			flex: 1,
			headerComponent: GrvCommentsBtnAddItem,
			headerComponentParams: { po, setPo },
			headerTooltip: "Click to add a new grv comment row.",
			sortable: false,
			filter: false,
			resizable: false,
			editable: false,
		},
		{
			field: "grvCommentMsg",
			headerName: "Comment Msg",
			flex: 4,
			headerTooltip: "Comment Msg",
		},
		{
			field: "grvCommentDate",
			headerName: "Date",
			flex: 2,
			headerTooltip: "Comment date",
		},
	];
	const { grvComments } = po.poData.poGrv;
	// console.log(`grvComments`, grvComments);
	const gridRef = useRef();
	const [rowData, setRowData] = useState(grvComments);
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

	const getRowId = useMemo(() => {
		return params => params.data.grvCommentId;
	}, []);

	const onCellEditRequest = useCallback(
		event => {
			// console.log(`event`, event);
			const data = event.data;
			// console.log(`data`, data)
			const field = event.colDef.field;
			// const newValue = event.newValue;
			const newItem = { ...data };
			newItem[field] = event.newValue;
			// console.log(`newItem`, newItem);
			// console.log("onCellEditRequest, updating " + field + " to " + newValue);

			// console.log(`po.poData.poGrv.grvComments`, po.poData.poGrv.grvComments);
			const newGrvComments = po.poData.poGrv.grvComments.map(oldItem => {
				// console.log(`-----------------------`)
				// console.log(`oldItem`, oldItem)
				// console.log(`newItem`, newItem);

				return oldItem.grvCommentId === newItem.grvCommentId ? newItem : oldItem;
			});
			// console.log(`newPoPi`, newPoPi);
			setRowData(newGrvComments);
			setPo({
				...po,
				poData: {
					...po.poData,
					poGrv: {
						...po.poData.poGrv,
						grvComments: newGrvComments,
					},
				},
			});
		},
		[po]
	);

	// console.log(`po`, po);

	return (
		<div className="ag-theme-alpine">
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
				readOnlyEdit={true}
				onCellEditRequest={onCellEditRequest}
				enableCellChangeFlash={true}
			/>
		</div>
	);
};

export default GrvCommentsTable;

// TODO: mouse over tips on the table skipHeader
