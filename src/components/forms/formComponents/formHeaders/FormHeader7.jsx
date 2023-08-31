import React from "react";
import "./FormHeader7.css";
import { MdClose } from "react-icons/md";

const FormHeader7 = props => {
	// console.log(`props`, props)
	const { erfNo, closeModal, trnsInErf, noOfAstsInErf } = props;
	return (
		<div className="form-header">
			<div className="header-left">
				<p className="form-header-erf-no">
					Erf No: <span className="data-emphasis">{erfNo}</span>
				</p>
				<p className="form-header-asts-in-erf">
					Assets: <span className="data-emphasis">{noOfAstsInErf}</span>
				</p>
			</div>
			<div className="header-right">
				<p className="form-header-trns-in-erf">
					Trns: <span className="data-emphasis">{trnsInErf}</span>
				</p>

				<p className="form-header-anomalies-in-erf">
					Anomalies: <span className="data-emphasis">{erfNo}</span>
				</p>
				<button onClick={() => closeModal()}>
					<MdClose />
				</button>
			</div>
		</div>
	);
};

export default FormHeader7;
