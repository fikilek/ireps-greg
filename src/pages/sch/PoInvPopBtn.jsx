// import React from "react";
import useModal from "../../hooks/useModal";

const PoInvPopBtn = params => {
	const { openModal } = useModal();
	const po = params.data;

	const handleClick = e => {
		e.preventDefault();
		openModal({
			modalName: "poInvPop",
			payload: {
				po,
			},
		});
	};

	return (
		<button onClick={handleClick} className="btn-table-row btn-trn-count">
			{po.poData.poInv.length} {` / `}
			{po.poData.poPop.length}
		</button>
	);
};

export default PoInvPopBtn;
