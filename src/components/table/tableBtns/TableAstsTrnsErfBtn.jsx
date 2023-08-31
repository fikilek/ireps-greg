import React from "react";
import { useDocumentSync } from "../../../hooks/useDocumentSync";
import useModal from "../../../hooks/useModal";

const TableAstsTrnsErfBtn = props => {
	// console.log(`props`, props);

	// Extract erf no from erf
	const erfNo = props.data?.erfData?.erfNo;
	// console.log(`erfNo`, erfNo)

	// Extract erf id from erf
	const erfId = props.data?.erfData?.id;
	// console.log(`erfId`, erfId);
	
	// get erf data
	const erfData = useDocumentSync("erfs", erfId);
	// console.log(`erfData`, erfData);

	// Get tenCount newTrns from metaData.trnCount
	const erf = erfData?.document;
	// console.log(`erf`, erf)

	const { openModal } = useModal();

	const handleClick = e => {
		// console.log(`open modal tableTrnsForAst with: `, trnCountArray);

		if (erf) {
			e.preventDefault();
			openModal({
				modalName: "tabsErfMapInfoWrapper",
				payload: erf,
			});
		}
	};

	return (
		<button type="button" onClick={handleClick} className="table-row-btn">
			{erfNo}
		</button>
	);
};

export default TableAstsTrnsErfBtn;
