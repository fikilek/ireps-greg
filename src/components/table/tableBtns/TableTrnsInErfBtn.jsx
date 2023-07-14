import React from "react";
import useModal from "../../../hooks/useModal";
const TableTrnsInErfBtn = props => {
	// console.log(`props`, props);

	// Extract trnCount from metaData.trnCount
	const trnCount = props.data?.trns?.length || 0;

	// Get tenCount newTrns from metaData.trnCount
	const ast = props.data;
	// console.log(`trnCountArray`, trnCountArray)

	const { openModal } = useModal();

	const handleClick = e => {
		// console.log(`open modal tableTrnsForAst with: `, trnCountArray);

		if (trnCount) {
			e.preventDefault();
			openModal({
				modalName: "tableTrnsInErf",
				payload: ast,
			});
		}
	};

	return (
		<button type="button" onClick={handleClick} className="table-row-btn">
			{trnCount}
		</button>
	);
};

export default TableTrnsInErfBtn;
