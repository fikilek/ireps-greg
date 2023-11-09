import React, { Children } from "react";
import "./FormHeader8.css";
import { MdClose } from "react-icons/md";

const FormHeader8 = props => {
	// console.log(`props`, props);

	const { dataLl, dataLm, dataRl, dataLr, closeModal } = props;
	return (
		<>
			<div className="form-header fh">
				<div className="fh-left fh-section">
					<p className="fh-paragraph fh-ll">{dataLl}</p>
					<p className="fh-paragraph fh-lm">{dataLm}</p>
				</div>
				<div className="fh-right fh-section">
					{/* <p className="fh-paragraph fh-rl">{dataRl}</p> */}
					{props.children}
					<p className="fh-paragraph fh-lr">{dataLr}</p>
					{/* <p className="fh-paragraph fh-rr anomalies">{dataRr}</p> */}
					<button className="fh-btn fh-rr" onClick={() => closeModal()}>
						<MdClose />
					</button>
				</div>
			</div>
		</>
	);
};

export default FormHeader8;
