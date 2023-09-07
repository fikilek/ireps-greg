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

const TableErfsUpload = props => {
	// console.log(`TableErfsUpload props`, props);
	const { erfs } = props;

	const { tableFields } = useColumnDefs({ml1: 'erfsUpload',});
	// console.log(tableFields);

	return (
		<div className={`table`}>
			<TabsErfs {...props} rowData={erfs} columnDefs={tableFields} purpose={"uploads"} />
			{/* <Table
				rowData={erfs}
				columnDefs={tableFields}
			/> */}
		</div>
	);
};
export default TableErfsUpload;
