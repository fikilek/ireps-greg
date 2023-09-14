import React from "react";
import { MdEdit } from "react-icons/md";
import useModal from "../../../../hooks/useModal";

const FormEditBtn = params => {
	const { openModal } = useModal();
	// console.log(`FormEditBtn params`, params)
	const { fn, data, disabled } = params;
	const color = disabled ? "lightgrey" : `green`;
	const iconStyles = { color, fontSize: "1.8rem" };

	const handleClick = e => {
		e.preventDefault();
		if (!disabled) {
			openModal({ modalName: fn, payload: { data, disabled, hideHeader: false } });
		}
	};

	return (
		<button className="form-edit-btn table-row-btn" onClick={handleClick}>
			<MdEdit style={iconStyles} />
		</button>
	);
};

export default FormEditBtn;
