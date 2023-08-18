import React from "react";
import "./FormHeader.css";
import { MdClose } from "react-icons/md";

const FormHeader5 = props => {
	// console.log(`props`, props)
	const { formName, trnState, erfNo, closeModal } = props;
	return (
		<div className="form-header">
			<div className="header-left">
				<p className="form-header-paragraph data-emphasis">{formName}</p>

				<p className="form-header-paragraph">
					Erf No: <span className="data-emphasis">{erfNo}</span>
				</p>
			</div>
			<div className="header-right">
				<p className="form-header-paragraph">
					Form State: <span className="data-emphasis">{trnState}</span>
				</p>
				<button onClick={() => closeModal()}>
					<MdClose />
				</button>
			</div>
		</div>
	);
};

export default FormHeader5;
