import React from "react";
import useModal from "../../hooks/useModal";

const PoBtn = params => {

	const {openModal} = useModal()

	const handleClick = e => {
		e.preventDefault()
		openModal({ modalName: "poForm", payload: params.data });
	};

	return (
		<button onClick={handleClick} className="btn-table-row btn-view-po">
			{`Po-${params.data.poNo}`}
		</button>
	);
};

export default PoBtn;
