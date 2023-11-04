import React, { useContext } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
// import "../navbar.css";
import { newPoFormData } from "../../../data/adminData/adminData";
import useModal from "../../../hooks/useModal";

const MenuAddPoBtn = () => {
	const { openModal } = useModal();

	const handleClick = e => {
		e.preventDefault();
		openModal({ modalName: "poForm", payload: newPoFormData });
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			id="poForm"
			className="menuAddPoBtn btn"
		>
			+
		</button>
	);
};

export default MenuAddPoBtn;
