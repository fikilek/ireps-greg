import React from "react";
import useModal from "../../../../hooks/useModal";

const TrnDataFormBtn = params => {
	// console.log(`params.data`, params.data);
	const { data } = params;
	// console.log(`data`, data);

	// get open modal rom useModal
	const { openModal } = useModal();

	// open trnAstCheckoutForm modal
	const handleClick = e => {
		openModal({
			modalName: "trnDataForm",
			payload: params.data,
		});
	};

	return (
		// tdfb - trn data form button
		<div className="tdfb">
			<button
				onClick={handleClick}
				className="table-row-btn table-row-btn-trn-data"
			>
				{data.metaData.trnType}
			</button>
		</div>
	);
};

export default TrnDataFormBtn;
