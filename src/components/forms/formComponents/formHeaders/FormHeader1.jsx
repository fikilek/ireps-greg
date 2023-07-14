import React from "react";
import "./FormHeader.css";
import { MdClose } from "react-icons/md";

const FormHeader1 = props => {
	const { formName, closeModal, fn } = props;
	return (
		<div className="form-header">
			<div className="header-line1">
				<p className="form-header-paragraph">
				{formName}</p>
				<p>{fn}</p>
			</div>
			<button onClick={() => closeModal()}>
				<MdClose />
			</button>
		</div>
	);
};

export default FormHeader1;
