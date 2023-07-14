import { ErrorMessage, Field } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextError from "../formError/TextError";

const FormikDatePicker = props => {
	const { name, label, ...rest } = props;
	return (
		<div className="form-control">
			<Field name={name}>
				{({ field, form }) => {
					const { setFieldValue } = form;
					const { value } = field;
					return (
						<DatePicker
							id={name}
							{...field}
							{...rest}
							selected={value.toDate()}
							onChange={val => setFieldValue(name, val)}
						/>
					);
				}}
			</Field>
			<label className="label" htmlFor={name}>{label}</label>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default FormikDatePicker;
