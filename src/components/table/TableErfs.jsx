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
import { useViewportDimensions } from "../../hooks/useViewportDimentions";
import { useColDefs } from "../../hooks/useColDefs";

const TableErfs = props => {
	// console.log(`TableErfs props-------------------------`, props);
	const { ml1, tn, ml3 } = props;

	// const { user } = useAuthContext()
	// console.log(`user`, user)

	const {
		data: rowData,
		// error,
		// isPending,
		// success,
	} = useCollection(ml1, tn, ml3);
	// console.log(`rowData`, rowData);

	const { getViewportDimensions } = useViewportDimensions();
	const viewportDimesions = getViewportDimensions();
	// console.log(`viewportDimesions`, viewportDimesions);

	const { tableFields } = useColDefs({
		viewportDimesions,
		ml1,
		ml2: tn,
		ml3,
	});
	// const tableFields = getTableFields();
	// console.log(tableFields);

	return (
		<div className={`table`}>
			<TabsErfs
				{...props}
				rowData={rowData}
				columnDefs={tableFields}
				purpose={"firestoreErfs"}
			/>
		</div>
	);
};
export default TableErfs;
