import React from "react";
import "./AstMediaBtn.css";
import { MdEdit } from "react-icons/md";
import useModal from "../../hooks/useModal";

const AstMediaBtn = params => {
	// console.log(`params`, params);
	const { openModal } = useModal();
	// console.log(`params`, params)
	const { fn, data, disabled } = params;
	// const color = disabled ? "lightgrey" : `green`;
	// const iconStyles = { color, fontSize: "1.8rem" };

	const displayValue =
		params.data.astData.astCartegory === "cb"
			? params.data.astData.cb.size
			: params.data.astData.astNo;

	const handleClick = e => {
		e.preventDefault();
		if (!disabled) {
			openModal({ modalName: "astMedia", payload: params });
		}
	};

	return (
		<button
			className="table-row-btn table-row-btn-ast-no btn-serial-no"
			onClick={handleClick}
		>
			{displayValue}
		</button>
	);
};

export default AstMediaBtn;
