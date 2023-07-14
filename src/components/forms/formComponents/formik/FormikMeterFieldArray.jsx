import { Field, FieldArray } from "formik";
import "./Formik.css";
import React from "react";

// Formik Sc Field Array to add Meter, Cb and ErfNo into a box form during installation
const FormikMeterFieldArray = props => {
	console.log(`props`, props);
	const { name, astCat, astCatIndex } = props;
	return (
		<div className={`form-control`}>
			<FieldArray name={name}>
				{props => {
					// console.log(`props`, props.form.values);
					const { push, remove, form } = props;
					console.log(`push`, push)
					return (
						<div>
							Meter Discorvery
						</div>
					);
				}}
			</FieldArray>
		</div>
	);
};

export default FormikMeterFieldArray;
