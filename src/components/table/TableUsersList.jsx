import React, { memo, useEffect, useMemo, useState } from "react";
import useCollection from "../../hooks/useCollection";
import { useColumnDefs } from "../../hooks/useColumnDefs.js";
import { irepsDictionary } from "../../utils/utils";
import Table from "../../components/table/Table";
import "./Table.css";
import "./TableUsersList.css";
import TableAddRecordBtn from "../../components/table/tableBtns/TableAddRecordBtn";
import TableWrapper from "../../components/table/TableWrapper";
import { useColDefs } from "../../hooks/useColDefs";
import { useViewportDimensions } from "../../hooks/useViewportDimentions";
import { functions } from "../../firebaseConfig/fbConfig";
import { httpsCallable } from "firebase/functions";
import useAuthContext from "../../hooks/useAuthContext";
import NotAuthenticated from "../../pages/auth/NotAuthenticated";
import { PropagateLoader } from "react-spinners";

// Suppliers is a page component
const TableUsersList = props => {
	// console.log(`props`, props);
	const { ml1, ml2 } = props;

	const { user, isAuthReady } = useAuthContext();
	// console.log(`user`, user);

	const [users, setUsers] = useState([]);
	// console.log(`users`, users);

	const listAllUsers = httpsCallable(functions, "listAllUsers");
	listAllUsers().then(usersList => {
		// console.log(`usersList`, usersList);
		if (users.length === 0) {
			setUsers(usersList.data);
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

	return isAuthReady ? (
		user ? (
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
		) : (
			<NotAuthenticated />
		)
	) : (
		<div className="users-list-loader ireps-loader">
			<PropagateLoader
				color="orange"
				loading={!isAuthReady}
				size={13}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
};
export default TableUsersList;
