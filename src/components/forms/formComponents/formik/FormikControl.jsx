import React from "react";
import FormikMediaButton from "./FormikMediaButton";
import FormikDatePicker from "./FormikDatePcker";
import FormikGeoButton from "./FormikGeoButton";
import FormikInput from "./FormikInput";
import FormikMeterFieldArray from "./FormikMeterFieldArray";
import FormikReverseGeocodeButton from "./FormikReverseGeocodeButton";
import FormikScFieldArray from "./FormikScFieldArray";
import FormikSelect from "./FormikSelect";
import FormikGeocodeButton from "./FormikGeocodeButton";

const FormikControl = props => {
	const { control, ...rest } = props;
	// console.log(`rest`, rest)
	switch (control) {
		case "input":
			return <FormikInput {...rest} />;
		case "scFieldArray":
			return <FormikScFieldArray {...rest} />;
		case "meterFieldArray":
			return <FormikMeterFieldArray {...rest} />;
		case "mediaButton":
			return <FormikMediaButton {...rest} />;
		case "geobutton":
			return <FormikGeoButton {...rest} />;
		case "gcButton":
			return <FormikGeocodeButton {...rest} />;
		case "rgcButton":
			return <FormikReverseGeocodeButton {...rest} />;
		// case 'textarea': return '';
		case "select":
			return <FormikSelect {...rest} />;
		// case 'radio': return '';
		// case 'checkbox': return '';
		case "datetime":
			return <FormikDatePicker {...rest} />;
		default:
			return null;
	}
};

export default FormikControl;
