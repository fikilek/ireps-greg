import React, { useEffect, useState, useContext, useRef } from "react";
import "./ReverseGeocodingApp.css";
// TODO: change GeodingApp.css to Geocoding.css
import useAuthContext from "../../hooks/useAuthContext";
import { ReverseGeocodingContext } from "../../contexts/ReverseGeocodingContext";
// import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
// import edumbe from "../../data/cadastral/edumbe/edumbe.geojson";
import lesediObedNkosiA from "../../data/cadastral/lesedi/ObedNkosi/lesediObedNkosiA.geojson";
import useGeoLocation from "../../hooks/useGeolocation";

const Marker = ({ children }) => children;

const ReverseGeocodingApp = () => {
	const mapRef = useRef();
	// console.log(`mapRef`, mapRef);
	const { rgcData, setRgcData } = useContext(ReverseGeocodingContext);
	// console.log(`rgcData`, rgcData);

	// get user location
	const { setGeolocation, userGps } = useGeoLocation();
	// console.log(`userGps`, userGps);

	const [address, setAddress] = useState("");
	// console.log(`address`, address);

	const { data, isOpened } = rgcData;
	// console.log(`data`, data);
	const openReverseGeocodingApp = isOpened ? "show-gc-app" : "hide-gc-app";

	const lat = data?.form?.values?.address?.gps?.latitude || 0;
	const lng = data?.form?.values?.address?.gps?.longitude || 0;
	const erfNo = data?.form?.values?.erfNo;
	// console.log(`lat`, lat);
	// console.log(`lng`, lng);

	const [map, setMap] = useState();

	// const { isLoaded } = useLoadScript({
	// 	googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	// });
	// console.log(`isLoaded`, isLoaded);

	const closeReverseGeocodingApp = e => {
		e.preventDefault();
		setRgcData({
			...rgcData,
			isOpened: false,
		});
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
				console.log(address);
				setAddress(address);
				rgcData.data.form.setFieldValue("address.systemAdr", address);
			})
			.catch(error => {
				console.error(`Error reverse geocoding: `, error);
				setAddress("Google address NOT avaiable");
				rgcData.data.form.setFieldValue("address.systemAdr", address);
			});
	}

	useEffect(() => {
		// setAddress(rgcData?.data?.address?.systemAdr);
	}, [rgcData]);

	useEffect(() => {
		if (map) {
			map.data.loadGeoJson(lesediObedNkosiA);
			map.data.setStyle({
				fillOpacity: 0.0,
			});
		}
	}, [map]);

	const onMapLoad = ({ map }) => {
		mapRef.current = map;
		// console.log(`mapRef`, mapRef);
		mapRef.current?.data?.loadGeoJson(lesediObedNkosiA);
		mapRef.current?.data?.setStyle({
			fillOpacity: 0.0,
		});
	};

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
					<GoogleMapReact
						bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
						zoom={19}
						center={{ lat, lng }}
						yesIWantToUseGoogleMapApiInternals
						onGoogleApiLoaded={onMapLoad}
					>
						<Marker lat={lat} lng={lng}>
							<span className="erf-no">{erfNo}</span>
						</Marker>
						<Marker
							position={{ lat: userGps.coordinates.lat, lng: userGps.coordinates.lng }}
						>
							<div className="userGpsPosition"></div>
						</Marker>
					</GoogleMapReact>
				</div>
			</div>
			<div className="footer"></div>
		</div>
	);
};

export default ReverseGeocodingApp;
