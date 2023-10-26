import { Field } from "formik";
import "./Formik.css";
import "./FormikMediaButton.css";
import React from "react";
import useGeoLocation from "../../../../hooks/useGeolocation";
// import useModal from "../../../modals/useModal";
import Geocode from "react-geocode";

const FormikGeoButton = props => {
	console.log(`props`, props);
	const { label, name, ...rest } = props;

	const { getGeolocation } = useGeoLocation();

	const handleClick = (e, props) => {
		e.preventDefault();
		console.log(`e.target`, e.target);
		console.log(`props`, props);
		const { field, meta, form } = props;

		// call setGeolocation and populate gps lat and gps lng
		const location = getGeolocation();
		// console.log(`location`, location);

		// set meter adr lat and lng using formik setFieldValue
		// first confirm you are in the required field name
		if (field.name === "astData[meter][0].trnData.astAdr.adr") {
			// console.log(`its an address field`, form);
			form.setFieldValue(
				"astData[meter][0].trnData.astAdr.gps.lat",
				location?.coordinates.lat
			);
			form.setFieldValue(
				"astData[meter][0].trnData.astAdr.gps.lng",
				location?.coordinates.lng
			);
		}

		// call google reverse geocoding api to get the address of the currnet location, then populate the meter adr field

		// console.log(`Geocode`, Geocode);

		if (Geocode) {
			// console.log(`Geocode`, Geocode)
			Geocode.setApiKey("AIzaSyCj8IfmDEGxDWEXesDKBanx6HDp_1jxluI");

			// set response language. Defaults to english.
			Geocode.setLanguage("en");

			// set response region. Its optional.
			// A Geocoding request with region=es (Spain) will return the Spanish city.
			Geocode.setRegion("za");

			// set location_type filter . Its optional.
			// google geocoder returns more that one address for given lat/lng.
			// In some case we need one address as response for which google itself provides a location_type filter.
			// So we can easily parse the result for fetching address components
			// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
			// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
			Geocode.setLocationType("ROOFTOP");

			// Enable or disable logs. Its optional.
			Geocode.enableDebug();
			// -32.313626373781254, 28.197117417436584;
			// -33.931264
			// Get address from latitude & longitude.
			// Geocode.fromLatLng(-32.313626373781254, 28.197117417436584).then(
			// Geocode.fromLatLng(-26.06467913760429, 28.01581016991478).then(
			Geocode.fromLatLng(
				location?.coordinates.lat,
				location?.coordinates.lng
			).then(
				response => {
					const address = response.results[0].formatted_address;
					console.log(address);
					form.setFieldValue("astData[meter][0].trnData.astAdr.adr", address);
				},
				error => {
					console.error(error);
					form.setFieldValue(
						"astData[meter][0].trnData.astAdr.adr",
						"address NOT avaiable - try manual"
					);
				}
			);
		}
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
						<button className="geo-btn" onClick={e => handleClick(e, props)}>
							<p className="geo-btn-p">{field?.value} 11</p>
						</button>
					);
				}}
			</Field>
			<label className={`label `} htmlFor={name}>
				{label}
			</label>
		</div>
	);
};

export default FormikGeoButton;
