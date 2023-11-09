import React, {
	useState,
	useRef,
	useEffect,
	useMemo,
	useCallback,
	useContext,
} from "react";
import format, { toDate } from "date-fns";
import "./adminUsers.css";

import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

// import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
// import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
// import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import {
	unpData,
	unpRoles,
	unpStates,
} from "../../../data/adminData/adminData";
import { UserContext } from "../../../contexts/UserContext";

const SelectUserRole = (options, p) => {
	// console.log(`options`, options);
	// console.log(`p`, p);
	const [status, setStatus] = useState();
	const { user } = useContext(UserContext);

	useEffect(() => {
		setStatus(p.value);
	}, []);

	const changeStatus = e => {
		setStatus(e.target.value);
	};

	return (
		<div>
			<select value={status} onChange={changeStatus}>
				{options &&
					options.map(option => {
						return (
							<option key={option.name} value={option.name}>
								{option.name}
							</option>
						);
					})}
			</select>
		</div>
	);
};

const SelectUserState = (options, p) => {
	// console.log(`options`, options);
	// console.log(`p`, p);
	const [status, setStatus] = useState();

	useEffect(() => {
		setStatus(p.value);
	}, [p.state]);

	const changeStatus = e => {
		setStatus(e.target.value);
	};

	return (
		<div className="admin-user-state">
			<select value={status} onChange={changeStatus}>
				{options &&
					options.map(option => {
						return (
							<option key={option.name} value={option.name}>
								{option.name}
							</option>
						);
					})}
			</select>
		</div>
	);
};

const App = () => {
	const gridRef = useRef(); // Optional - for accessing Grid's API
	const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row

	// Each Column Definition results in one Column.
	const [columnDefs, setColumnDefs] = useState([
		{ field: "id" },
		{ field: "surname" },
		{ field: "name" },
		{ field: "email" },
		{ field: "password" },
		{ field: "role", cellRenderer: p => SelectUserRole(unpRoles, p) },
		{ field: "state", cellRenderer: p => SelectUserState(unpStates, p) },
		{ field: "dateCreated" },
		{ field: "dateUpdate" },
	]);

	const defaultColDef = useMemo(() => ({
		sortable: true,
		filter: true,
		resizable: true,
		suppressMovable: true,
	}));

	useEffect(() => {
		setRowData(unpData);
	}, []);

	const onFirstDataRendered = useCallback(() => {
		const allColumnIds = [];
		gridRef.current.columnApi.getColumns().forEach(column => {
			allColumnIds.push(column.getId());
		});
		gridRef.current.columnApi.autoSizeColumns(allColumnIds, true);
	}, []);

	return (
		<>
			<div className="ag-theme-alpine ireps-table">
				<AgGridReact
					ref={gridRef} // Ref for accessing Grid's API
					rowData={rowData} // Row Data for Rows
					columnDefs={columnDefs} // Column Defs for Columns
					defaultColDef={defaultColDef} // Default Column Properties
					animateRows={true} // Optional - set to 'true' to have rows animate when sorted
					rowSelection="multiple" // Options - allows click selection of rows
					onFirstDataRendered={onFirstDataRendered}
				/>
			</div>
		</>
	);
};

export default App;
