import { ErrorMessage, Field } from "formik";
import './Formik.css'
import React from "react";
import TextError from "../formError/TextError";


const FormikButton = props => {
	// console.log(`props`, props);
	const { label, name, ...rest } = props;

	const handleClick = (e, props) => {
		e.preventDefault()
		console.log(`e.target`, e.target);
		console.log(`props`, props)
	}
	return (
		<div className={`form-control ${name} `}>
			<Field name={name} {...rest}>
				{props => {
					// console.log(`props`, props)
					const { field, meta, form } = props;
					return (

						<button onClick={(e) => handleClick(e, props)} data-mydata={field} >{
							meta.value === 0 ?
							("No Photo") :
							`${meta.value.length}  ${ meta.value.length === 1 ? 'Photo' : "Photos" }`
						}</button>
						// <input
						// 	type='button'
						// 	{...field}
						// 	{...rest}
							// className={meta.error && meta.touched ? `inputError` : ""}
						// />
					);
				}}
			</Field>
			{/* <label className="label" htmlFor={name}>{label}</label> */}
			{/* <ErrorMessage name={name} component={TextError}></ErrorMessage> */}
		</div>
	);
};

export default FormikButton;
