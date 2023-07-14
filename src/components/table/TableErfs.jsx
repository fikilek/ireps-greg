import React, { memo, useEffect, useMemo, useState } from "react";
import { timestamp } from "../../firebaseConfig/fbConfig";
import { useAstCategories } from "../../hooks/useAstCategories";
import useAuthContext from "../../hooks/useAuthContext";
import useCollection from "../../hooks/useCollection";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import useModal from "../../hooks/useModal";
import { useTrnForm } from "../../hooks/useTrnForm";
import Table from "./Table";
import "./Table.css";
import TableAddRecordBtn from "./tableBtns/TableAddRecordBtn";
import { fsTrnData } from "../forms/formComponents/formSections/fsTrnData";
import { formSects } from "../forms/formComponents/formSections/formSects";
import TabsErfs from "../tabs/erfsTabs/TabsErfs";

const TableErfs = props => {
	// console.log(`props`, props);
	const { ml1, tn, ml3, nfd, fn } = props;

	const {
		data: rowData,
		error,
		isPending,
		success,
	} = useCollection(ml1, tn, ml3);
	// console.log(`rowData`, rowData);

	const { tableFields: columnDefs } = useColumnDefs({
		ml1,
		ml2: tn,
		ml3,
	});
	// console.log(`columnDefs`, columnDefs);
	// console.log(`isPending`, isPending);
	// console.log(`success`, success);
	// console.log(`error`, error);

	return (
		<div className={`table ${tn}`}>
			<TabsErfs {...props} rowData={rowData} columnDefs={columnDefs} />
		</div>
	);
};
export default TableErfs;
