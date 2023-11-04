import React from "react";
import useModal from "../../../hooks/useModal";

const TableAstsInErfBtn = props => {
	// console.log(`props`, props)

	// Extract trnCount from metaData.trnCount
	const trnCount = props.data?.asts?.length || 0;

	// destructure asts from erf
	const { asts } = props.data;
	// console.log(`asts`, asts)

	// Get tenCount newTrns from metaData.trnCount
	const ast = props.data;
	// console.log(`trnCountArray`, trnCountArray)

	// workout how many asts in the asts array
	let erfAsts = [];
	asts &&
		asts.forEach(ast => {
			const tempAstNo = ast?.astData?.astNo;
			const cleanAstNo = tempAstNo.trim();
			if (!erfAsts.includes(cleanAstNo)) {
				erfAsts.push(ast.astData.astNo);
			}
		});

	const { openModal } = useModal();

	const handleClick = e => {
		// console.log(`open modal tableTrnsForAst with: `, trnCountArray);

		if (trnCount) {
			e.preventDefault();
			openModal({
				modalName: "tableAstsInErf",
				payload: ast,
			});
		}
	};

	return (
		<button type="button" onClick={handleClick} className="table-row-btn">
			{erfAsts.length}
		</button>
	);
};

export default TableAstsInErfBtn;
