import React, { memo, useEffect, useMemo, useState } from "react";
import useCollection from "../../hooks/useCollection";
import { useColumnDefs } from "../../hooks/useColumnDefs.js";
import { irepsDictionary } from "../../utils/utils";
import Table from "./Table";
import "./Table.css";
import "./TableUsersList.css";
import TableAddRecordBtn from "./tableBtns/TableAddRecordBtn";
import TableWrapper from "./TableWrapper";
import { useColDefs } from "../../hooks/useColDefs";
import { useViewportDimensions } from "../../hooks/useViewportDimentions";
import { functions } from "../../firebaseConfig/fbConfig";
import { httpsCallable } from "firebase/functions";

// Suppliers is a page component
const TableUsersList = props => {
	// console.log(`props`, props);
	const { ml1, ml2 } = props;
	
	const [users, setUsers] = useState([])
	// console.log(`users`, users);

	const listAllUsers = httpsCallable(functions, "listAllUsers");
	listAllUsers().then(usersList => {
		// console.log(`usersList`, usersList);
		if (users.length === 0) {
			setUsers(usersList.data)
		}
	});

	// console.log(`rowData`, rowData);

	const { getViewportDimensions } = useViewportDimensions();
	const viewportDimesions = getViewportDimensions();
	// console.log(`viewportDimesions`, viewportDimesions);

	const { tableFields } = useColDefs({
		viewportDimesions,
		ml1,
		ml2,
	});
	// console.log(`tableFields`, tableFields);

	return (
		<div className={`table `}>
			<div className="table-header">
				<div className="th-menu-levels">
					<p>
						{`
							${ml1 ? `${irepsDictionary.get(ml1)}` : ""}
							${ml2 ? `/ ${irepsDictionary.get(ml2)}s` : ""} 
						`}
					</p>
				</div>
				<div></div>
				<div></div>
			</div>
			<TableWrapper rowData={users} columnDefs={tableFields} ml1={ml1}>
				<Table rowData={users} columnDefs={tableFields} ml1={ml1} />
			</TableWrapper>
		</div>
	);
};
export default TableUsersList;
