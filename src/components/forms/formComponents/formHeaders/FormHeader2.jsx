import React from "react";
import "./FormHeader.css";
import { MdClose } from "react-icons/md";

const FormHeader2 = props => {
	const { formName, closeModal, astState, astCartegory } = props;
	return (
		<div className="form-header">
			<div className="header-line1">
				<p>{formName}</p>
				<p>Ast State: {astState}</p>
				<p>{astCartegory}</p>
			</div>
			<button onClick={() => closeModal()}>
				<MdClose />
			</button>
		</div>
	);
};

export default FormHeader2;
