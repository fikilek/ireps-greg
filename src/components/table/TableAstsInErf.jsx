import React, { memo, useEffect, useMemo, useState } from "react";
import { MdClose } from "react-icons/md";
import { useColumnDefs } from "../../hooks/useColumnDefs";
import useModal from "../../hooks/useModal";
import "./Table.css";
import TableTrns from "./TableTrns";

// This component show all transactions for a particular ast
const TableAstsInErf = props => {
	// console.log(`TableAstsInErf props`, props);

	// get asts from props astsData
	const astsArray = props?.astsData?.asts;
	// console.log(`astsArray`, astsArray);

	// get erfNo
	const erfNo = props.astsData?.erfNo;

	const { closeModal } = useModal();

	const { tableFields: columnDefs } = useColumnDefs({ ml1: "astsInErf" });
	// console.log(`columnDefs`, columnDefs);

	return (
		<div className={`table`}>
			<div className="table-header1">
				<div className="">
					<p>
						Asts in Erf: <span className="data-emphasis">{erfNo}</span>
					</p>
				</div>
				<button className="table-header-close-btn" onClick={() => closeModal()}>
					<MdClose />
				</button>
			</div>
			<TableTrns rowData={astsArray} columnDefs={columnDefs} />
		</div>
	);
};
export default TableAstsInErf;
