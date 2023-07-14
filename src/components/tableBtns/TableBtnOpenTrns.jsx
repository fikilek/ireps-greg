import React from "react";
import { useNavigate } from "react-router-dom";

const TableBtnOpenTrns = params => {
	// console.log(`params`, params)
	const navigate = useNavigate();
	const handleOpenAst = e => {
		// console.log(`open ast btn clicked : params : `, params);
		// navigate(`/trns/${params.data.astData.astCartegory}s`, { replace: true });
		navigate({
			pathname: `/trns/${params.data.astData.astCartegory}s`,
			search: `?astSystemId=${params.data.astSystemId}`,
		});
	};
	return (
		<button
			type="button"
			onClick={handleOpenAst}
			className="btn-table-row btn-trn-count"
		>
			{params.value}
		</button>
	);
};

export default TableBtnOpenTrns;
