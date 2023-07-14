import React, { memo, useEffect, useMemo, useState } from "react";
import { MdClose } from "react-icons/md";
import { useFirestore } from "../../hooks/useFirestore";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import useModal from "../../hooks/useModal";
import "./Table.css";
import TableTrns from "./TableTrns";

// This component show all transactions for a particular ast
const TableTrnsInErf = props => {
	// console.log(`props`, props);

	// get trns from props tableData
	const trnsArray = props.trnsData.trns;
	// console.log(`trnsArray`, trnsArray)

	// get astNo
	const erfNo = props.trnsData.erfNo

	const { closeModal } = useModal();

	const { tableFields: columnDefs } = useColumnDefs({ ml1: "trnsForAst" });
	// console.log(`columnDefs`, columnDefs);

	return (
		<div className={`table`}>
			<div className="table-header1">
				<div className="">
					<p>
						Transactions in Erf: <span className="data-emphasis">{erfNo}</span>
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
export default TableTrnsInErf;
