import { ErrorMessage, Field } from "formik";
import "./Formik.css";
import React from "react";
import TextError from "../formError/TextError";

const FormikMeterNo = props => {
	// console.log(`props`, props);
	const { label, name, ...rest } = props;

	const handleChange = (e, form) => {
		// console.log(`e.target.value`, e.target.value);
		// console.log(`form`, form);
		form.handleChange(e);
		form.setFieldValue("astData[seal][0].trnData.linkedMeterNo", e.target.value);
		form.setFieldValue(
			"astData[cb][0].trnData.linkedMeter.meterNo",
			e.target.value
		);
	};

	return (
		<div className={`form-control ${name} `}>
			<Field name={name} {...rest}>
				{props => {
					// console.log(`props`, props)
					const { field, meta, form } = props;

					return (
						<input {...field} {...rest} onChange={e => handleChange(e, form)} />
					);
				}}
			</Field>
			<label htmlFor={name}>{label}</label>
			<ErrorMessage name={name} component={TextError}></ErrorMessage>
		</div>
	);
};

export default FormikMeterNo;
