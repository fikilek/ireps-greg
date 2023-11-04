import { ErrorMessage, Field } from "formik";
import "./Formik.css";
import React, { useContext } from "react";
import TextError from "../formError/TextError";
import { FormStateContext } from "../../../../contexts/FormStateContextProvider";

const FormikInputNumberOnly = props => {
	// console.log(`props`, props);
	const { label, name, ...rest } = props;

	const { formState } = useContext(FormStateContext);
	// console.log(`formState`, formState);

	let fieldStatus = null;
	let errorStauts = null;

	return (
		<div className={`form-control ${name} `}>
			<Field name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, meta, form } = props;
					fieldStatus = "";
					errorStauts = meta.error && meta.touched ? `inputError` : "";

					return (
						<input {...field} {...rest} className={`${errorStauts} ${fieldStatus}`} />
					);
				}}
			</Field>
			<label className={`label  ${fieldStatus} `} htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={TextError}></ErrorMessage>
		</div>
	);
};

export default FormikInputNumberOnly;
