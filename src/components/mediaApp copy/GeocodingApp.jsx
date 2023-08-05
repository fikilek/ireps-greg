import React, { useEffect, useState, useContext } from "react";
import Webcam from "react-webcam";
// import { GeocodingAppContext } from "../../contexts/GeocodingAppContext";
import "./GeocodingApp.css";
import useAuthContext from "../../hooks/useAuthContext";
import useGeoLocation from "../../hooks/useGeolocation";
import { GeocodingContext } from "../../contexts/GeocodingContext";
import {
	GoogleMap,
	MarkerF,
	Data,
	useLoadScript,
	InfoWindowF,
	DataF,
} from "@react-google-maps/api";
import Geocode from "react-geocode";

const GeocodingApp = () => {
	const { gcData, setGcData } = useContext(GeocodingContext);
	// console.log(`gcData`, gcData);

	// console.log(
	// 	`lat`,
	// 	gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lat
	// );

	// current meter address
	// const currentMeterAdrGps = {
	// 	lat: gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lat,
	// 	lng: gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lng,
	// };
	// console.log(`currentMeterAdrGps`, currentMeterAdrGps);

	const [meterGps, setMeterGps] = useState({
		lat: gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lat,
		lng: gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lng,
	});
	// console.log(`meterGps`, meterGps);

	// get geolocation
	// const [userGps, setUserGps] = useState(null);
	const { userGps } = useGeoLocation();
	// console.log(`location`, location);
	// console.log(`userGps`, userGps);

	const [map, setMap] = useState();
	// const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
	// const [infoWindowData, setInfoWindowData] = useState();
	// const [center, setCenter] = useState(null);
	// const [bounds, setBounds] = useState(null);
	const [address, setSetAddress] = useState(
		gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.adr
	);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});
	// console.log(`isLoaded`, isLoaded);

	// get currnet user data
	const { user } = useAuthContext();
	// console.log(`user`, user)

	const { data, isOpened } = gcData;
	// console.log(`data`, data);
	const openGeocodingApp = isOpened ? "show-gc-app" : "hide-gc-app";

	const closeGeocodingApp = e => {
		e.preventDefault();
		setGcData({
			...gcData,
			isOpened: false,
		});
	};

	const onMapLoad = map => {
		// console.log(`bounds`, bounds);
		// const bounds = new window.google.maps.LatLngBounds();
		// setBounds(bounds);
		setMap(map);
	};

	const onUnmount = React.useCallback(map => {
		setMap(null);
	}, []);

	// const center = {
	// 	// lat: location?.coordinates?.lat,
	// 		lat: -32.332396172986854,
	// 	// lng: location?.coordinates?.lng,
	// 		lng: 28.14446795090262,
	// };

	const onDragEnd = e => {
		// e.preventDefault()
		// console.log(`end of drag`, e);
		const newMeterGps = new window.google.maps.LatLng(
			e.latLng.lat(),
			e.latLng.lng()
		);

		setMeterGps(newMeterGps);

		if (Geocode) {
			console.log(`Geocode`, Geocode);
			// Geocode.setApiKey("AIzaSyCj8IfmDEGxDWEXesDKBanx6HDp_1jxluI");
			Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

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

			// console.log(`lat`, e.latLng.lat());
			// console.log(`lng`, e.latLng.lng());
			// console.log(`--------------------`);
			// console.log(`latitude: `, -32.332396172986854);
			// console.log(`longitude: `, 28.14446795090262);
			// console.log(`--------------------`);
			Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
				// Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
				// Geocode.fromLatLng(e.latLng.lat(), e.latLng.lat()).then(
				response => {
					console.log(`response`, response);
					const address = response.results[0].formatted_address;
					console.log(address);
					setSetAddress(address);
					gcData.data.form.setFieldValue(
						"astData[meter][0].trnData.astAdr.adr",
						address
					);
					gcData.data.form.setFieldValue(
						"astData[meter][0].trnData.astAdr.gps.lat",
						e.latLng.lat()
					);
					gcData.data.form.setFieldValue(
						"astData[meter][0].trnData.astAdr.gps.lng",
						e.latLng.lng()
					);
				},
				error => {
					console.error(`Error reverse geocoding: `, error);
					setSetAddress("address NOT avaiable");
					// form.setFieldValue(
					// 	"astData[meter][0].trnData.astAdr.adr",
					// 	"address NOT avaiable - try manual"
					// );
				}
			);
		}
	};

	useEffect(() => {
		setSetAddress(
			gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.adr
		);
	}, [gcData]);

	useEffect(() => {
		gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lat
			? setMeterGps({
					lat: gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lat,
					lng: gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lng,
			  })
			: setMeterGps({
					// lat: userGps?.coordinates.lat,
					// lat: userGps?.coordinates.lng,
					lat: -27.42526206328501,
					lng: 30.81783694804052,
			  });
	}, [userGps]);

	return (
		<div className={`geocoding-app ${openGeocodingApp}`}>
			<div className="header">
				<div className="header-subsection name">
					<h3 className="data-emphasis">Meter Address</h3>
				</div>
				<div className="header-subsection name">
					<button>{address}</button>
				</div>
				<div className="header-subsection id">
					<h3 className="data-emphasis">
						{gcData?.data?.form?.values?.astData?.meter[0].astData.astNo}{" "}
					</h3>
				</div>
				<div className="header-subsection close">
					<button onClick={closeGeocodingApp}>X</button>
				</div>
			</div>
			<div className="body">
				{/* display map */}
				<div className="geocoding-map">
					{!isLoaded ? (
						<h1>Loading...</h1>
					) : (
						<GoogleMap
							mapContainerClassName="map-container"
							onLoad={onMapLoad}
							center={meterGps}
							zoom={18}
							onUnmount={onUnmount}
						>
							<MarkerF
								position={ meterGps }
								// label={`${center.lat} ${center.lng}`}
								icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
								draggable={true}
								onDragEnd={onDragEnd}
							></MarkerF>
						</GoogleMap>
					)}
				</div>
			</div>
			<div className="footer"></div>
		</div>
	);
};

export default GeocodingApp;
