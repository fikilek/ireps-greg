import React, { memo, useEffect, useMemo, useState } from "react";
import { MdClose } from "react-icons/md";
import { useFirestore } from "../../hooks/useFirestore";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import useModal from "../../hooks/useModal";
import "./Table.css";
import TableTrns from "./TableTrns";

// This component show all transactions for a particular ast
const TableTrnsForAst = props => {
	// console.log(`props`, props);

	// get trns from props tableData
	const trnsArray = props.astData.metaData.trnCount;
	// console.log(`trnsArray`, trnsArray)

	// get astNo
	const astNo = props.astData.astData.astNo

	const { closeModal } = useModal();

	const { tableFields: columnDefs } = useColumnDefs({ ml1: "trnsForAst" });
	// console.log(`columnDefs`, columnDefs);

	return (
		<div className={`table`}>
			<div className="table-header1">
				<div className="">
					<p>
						Transactions for ast: <span className="data-emphasis">{astNo}</span>
					</p>
				</div>
				<button className="table-header-close-btn" onClick={() => closeModal()}>
					<MdClose />
				</button>
			</div>
			<TableTrns rowData={trnsArray} columnDefs={columnDefs} />
		</div>
	);
};
export default TableTrnsForAst;
