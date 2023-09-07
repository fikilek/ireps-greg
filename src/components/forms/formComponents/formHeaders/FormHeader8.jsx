import React from "react";
import "./FormHeader8.css";
import { MdClose } from "react-icons/md";

const FormHeader5 = props => {
	// console.log(`props`, props)
	const { dataLl, dataLr, dataRl, dataRr, closeModal } = props;
	return (
		<div className="form-header fh">
			<div className="fh-left fh-section">
				<p className="fh-paragraph fh-ll">{dataLl}</p>
				<p className="fh-paragraph fh-lr">{dataLr}</p>
			</div>
			<div className="fh-right fh-section">
				<p className="fh-paragraph fh-rl">{dataRl}</p>
				{/* <p className="fh-paragraph fh-rr anomalies">{dataRr}</p> */}
				<button className="fh-btn fh-rr" onClick={() => closeModal()}>
					<MdClose />
				</button>
			</div>
		</div>
	);
};

export default FormHeader5;