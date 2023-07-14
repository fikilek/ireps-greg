import React from "react";
import "./FormHeader.css";
import { MdClose } from "react-icons/md";

const FormHeader4 = props => {
	const { formName, closeModal, formNo } = props;
	return (
		<div className="form-header">
			<div className="header-line1">
				<p className="data-emphasis">{formName} form</p>
				<p>
					Erf No: {formNo ? <span className="data-emphasis">{formNo}</span> : ""}
				</p>
			</div>
			<button onClick={() => closeModal()}>
				<MdClose />
			</button>
		</div>
	);
};

export default FormHeader4;
