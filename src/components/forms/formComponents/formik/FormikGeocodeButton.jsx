import { Field } from "formik";
import "./Formik.css";
import "./FormikGeocodeButton.css";
import React from "react";
import { useContext } from "react";
import { GeocodingContext } from "../../../../contexts/GeocodingContext";

const FormikGeocodeButton = props => {
	// console.log(`props`, props);
	const { label, name, ...rest } = props;

	// get reverse geocoding context
	const { setGcData } = useContext(GeocodingContext);

	const handleClick = (e, props) => {
		e.preventDefault();
		console.log(`e.target`, e.target);
		// console.log(`props`, props);
		const { field, meta, form } = props;

		// open geocoding modal
		setGcData(prev => {
			return {
				...prev,
				isOpened: true,
				data: props,
			};
		});
	};
	return (
		<div className={`form-control ${name} `}>
			<Field name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, meta, form } = props;
					// console.log(`madiaCat`, mediaCat, field.value.length)
					// console.log(`form.values`, form.values)
					return (
						<button className="geocoding-btn" onClick={e => handleClick(e, props)}>
							{/* <p className="geocoding-btn-p">{field?.value}</p> */}
							<p className="geocoding-btn-p">{ meta.value }</p>
						</button>
					);
				}}
			</Field>
			{/* <label className={`label `} htmlFor={name}>
				{label}
			</label> */}
		</div>
	);
};

export default FormikGeocodeButton;
