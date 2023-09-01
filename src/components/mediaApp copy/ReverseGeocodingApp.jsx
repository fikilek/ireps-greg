import React, { useEffect, useState, useContext } from "react";
import "./ReverseGeocodingApp.css";
// TODO: change GeodingApp.css to Geocoding.css
import useAuthContext from "../../hooks/useAuthContext";
import { ReverseGeocodingContext } from "../../contexts/ReverseGeocodingContext";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import Geocode from "react-geocode";
import edumbe from "../../data/cadastral/edumbe/edumbe.geojson";

const ReverseGeocodingApp = () => {
	const { rgcData, setRgcData } = useContext(ReverseGeocodingContext);
	// console.log(`rgcData`, rgcData);

	const [address, setAddress] = useState("");
	// console.log(`address`, address);

	const { data, isOpened } = rgcData;
	// console.log(`data`, data);
	const openReverseGeocodingApp = isOpened ? "show-gc-app" : "hide-gc-app";

	const lat = data?.form?.values?.address?.gps?.latitude;
	const lng = data?.form?.values?.address?.gps?.longitude;
	const erfNo = data?.form?.values?.erfNo;
	// console.log(`lat`, lat);
	// console.log(`lng`, lng);

	const [map, setMap] = useState();

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});
	// console.log(`isLoaded`, isLoaded);

	const closeReverseGeocodingApp = e => {
		e.preventDefault();
		setRgcData({
			...rgcData,
			isOpened: false,
		});
	};

	const onMapLoad = map => {
		setMap(map);
	};

	const onUnmount = React.useCallback(map => {
		setMap(null);
	}, []);

	if (Geocode && lat && lng) {
		// console.log(`Geocode`, Geocode);
		Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

		// set response language. Defaults to english.
		Geocode.setLanguage("en");

		// set response region. Its optional. A Geocoding request with region=es (Spain) will return the Spanish city.
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
		Geocode.fromLatLng(lat, lng)
			.then(response => {
				// console.log(`response`, response);
				const address = response.results[0].formatted_address;
				// console.log(address);
				setAddress(address);
				rgcData.data.form.setFieldValue("address.systemAdr", address);
			})
			.catch(error => {
				console.error(`Error reverse geocoding: `, error);
				// setAddress("address NOT avaiable");
			});
	}

	useEffect(() => {
		// setAddress(rgcData?.data?.address?.systemAdr);
	}, [rgcData]);

	useEffect(() => {
		if (map) {
			map.data.loadGeoJson(edumbe);
			map.data.setStyle({
				fillOpacity: 0.0,
			});
		}
	}, [map]);

	return (
		<div className={`reverse-geocoding-app ${openReverseGeocodingApp}`}>
			<div className="header">
				<div className="header-subsection-left address">
					<button>{address ? address : "No Address"}</button>
				</div>

				<div className="header-subsection-right erf-no">
					<div className="header-subsection">
						<p>Erf No:</p>
						<h3 className="data-emphasis">{erfNo} </h3>
					</div>

					<div className="header-subsection reverse-geocoding-app-close-btn">
						<button onClick={closeReverseGeocodingApp}>X</button>
					</div>
				</div>
			</div>
			<div className="body">
				{/* display map */}
				<div className="reverse-geocoding-map">
					{!isLoaded ? (
						<h1>Loading...</h1>
					) : (
						<GoogleMap
							mapContainerClassName="map-container"
							onLoad={onMapLoad}
							center={{ lat, lng }}
							zoom={18}
							onUnmount={onUnmount}
						>
							<MarkerF
								position={{ lat, lng }}
								icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
							></MarkerF>
						</GoogleMap>
					)}
				</div>
			</div>
			<div className="footer"></div>
		</div>
	);
};

export default ReverseGeocodingApp;