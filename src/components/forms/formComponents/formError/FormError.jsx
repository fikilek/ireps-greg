import React from "react";
import './FormError.css'

// fe: form error. This is the error that happend during form submission

const FormError = ({ error }) => {
	return (
		<div className="form-error">
			<p>{error}</p>
		</div>
	);
};

export default FormError;
