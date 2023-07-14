import React, { useState } from "react";
import FormBodyPo from "../formComponents/FormBodyPo";
import FormHeader from "../formComponents/formHeaders/FormHeader";
// import "./PoForm.css";

const PoForm = ({ formData }) => {
	// console.log(`formData`, formData)
	return (
		<div className="ireps-form">
			<div className="po-container">
				<FormHeader formData={formData} />
				<FormBodyPo formData={formData} />
			</div>
		</div>
	);
};

export default PoForm;
