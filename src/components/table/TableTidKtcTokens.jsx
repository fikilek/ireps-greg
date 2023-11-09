import React from "react";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import Table from "./Table";
import "./Table.css";

const TableTidKtcTokens = props => {
	// console.log(`TableTidKtcTokens props`, props);
	const { tidKtcTokens } = props;

	const { tableFields } = useColumnDefs({
		ml1: "admin",
		ml2: "uploads",
		ml3: "tidKtcTokens",
	});
	// console.log(tableFields);

	return (
		<div className={`table`}>
			<Table rowData={tidKtcTokens} columnDefs={tableFields} />
		</div>
	);
};
export default TableTidKtcTokens;
