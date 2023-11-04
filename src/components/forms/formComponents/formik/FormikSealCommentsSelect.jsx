import { ErrorMessage, Field } from "formik";
import "./Formik.css";
import React from "react";
import TextError from "../formError/TextError";

const FormikSealCommentsSelect = props => {
	// console.log(`props`, props);
	const { label, name, options, ...rest } = props;

	// console.log(`rest`, rest);

	return (
		<div className={`form-control ${name} `}>
			<Field id={name} name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { meta, field, form } = props;

					const handleChange = e => {
						// console.log(`selet changed`, e.target.value);
						// field.onChange(() => e.target.value);
						form.setFieldValue(field.name, e.target.value);
						if (
							e.target.value === "nsn (sealed)" ||
							e.target.value === "snnv (sealed)"
						) {
							form.setFieldValue("astData[seal][0].astData.astNo", e.target.value);
						}
						if (e.target.value === "choose") {
							form.setFieldValue("astData[seal][0].astData.astNo", "");
						}
					};

					return (
						<select {...field} onChange={handleChange}>
							{field.value ? (
								<option key={field.value} value={field.value}>
									{field.value}
								</option>
							) : null}

							{options &&
								options.map(option => {
									if (option.value === meta.value) {
										return null;
									} else
										return (
											<option key={option.value} value={option.value}>
												{option.key}
											</option>
										);
								})}
						</select>
					);
				}}
			</Field>
			<label className="label" htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={TextError}></ErrorMessage>
		</div>
	);
};

export default FormikSealCommentsSelect;
