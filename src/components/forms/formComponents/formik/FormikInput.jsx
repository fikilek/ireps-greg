import { ErrorMessage, Field } from "formik";
import "./Formik.css";
import React, { useContext } from "react";
import TextError from "../formError/TextError";
import { FormStateContext } from "../../../../contexts/FormStateContextProvider";

const FormikInput = props => {
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
					// console.log(`props`, props)
					const { field, meta, form } = props;
					fieldStatus = "";
					errorStauts = meta.error && meta.touched ? `inputError` : "";

					if (
						field.name === "astData[meter][0].trnData.voltageReading.phase2" ||
						field.name === "astData[meter][0].trnData.voltageReading.phase3"
					) {
						// console.log(`field.name is: `, "phase3");
						if (form.values.astData["meter"][0].astData.meter.phase === "three") {
							// three phase meter has been selected
							// console.log(`three phase meter has been selected - SHOW input form`);
							fieldStatus = "enableField";
						} else {
							// three phase meter has NOT been selected
							// console.log(`three phase meter has NOT been selected - HIDE input form`);
							fieldStatus = "disableField";
						}
					}

					if (field.name === "astData[seal][0].trnData.linkedMeterNo") {
						// console.log(`field is inkedMeterNo`);
						// console.log(
						// 	`form.values.astData["meter"][0].astData.meter.astNo`,
						// 	form.values.astData["meter"][0].astData.astNo
						// );
						// console.log(`form`, form);
						// form.setFieldValue(
						// 	"astData[seal][0].trnData.linkedMeterNo",
						// 	form.values.astData["meter"][0].astData.astNo
						// );
					}
					if (field.name === "astData[cb][0]..astData.astMedia.sizeMedia") {
						console.log(`its a cb`);
						console.log(`form.values`, form.values);
					}
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

export default FormikInput;
