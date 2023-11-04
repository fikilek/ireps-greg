import React, { useEffect, useState, useContext, useRef } from "react";
import Webcam from "react-webcam";
// import { GeocodingAppContext } from "../../contexts/GeocodingAppContext";
import "./GeocodingApp.css";
import useAuthContext from "../../hooks/useAuthContext";
import useGeoLocation from "../../hooks/useGeolocation";
import { GeocodingContext } from "../../contexts/GeocodingContext";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import { ErfsContext } from "../../contexts/ErfsContext";
// import edumbe from "../../data/cadastral/edumbe/edumbe.geojson";
// import ratandab from "../../data/cadastral/lesedi/ratandab.geojson";
import lesediObedNkosiA from "../../data/cadastral/lesedi/ObedNkosi/lesediObedNkosiA.geojson";
import useSupercluster from "use-supercluster";
import { getAstCat } from "../../utils/utils";

const Marker = ({ children }) => children;

const GeocodingApp = () => {
	const { gcData, setGcData } = useContext(GeocodingContext);
	// console.log(`gcData`, gcData);

	const mapRef = useRef();
	// console.log(`mapRef`, mapRef);

	const { erfs } = useContext(ErfsContext);

	// extract ast cat
	const astCat = getAstCat(gcData?.data?.field?.name);
	// console.log(`astCat`, astCat);

	// get user location
	const { setGeolocation, userGps } = useGeoLocation();
	// console.log(`userGps`, userGps);

	// setGeolocation();

	const [bounds, setBounds] = useState([]);
	// console.log(`bounds`, bounds);
	const [zoom, setZoom] = useState(10);
	// console.log(`zoom`, zoom)

	// console.log(
	// 	`lat`,
	// 	gcData?.data?.form?.values?.astDatmeterGpsa?.meter[0].trnData.astAdr.gps.lat
	// );

	// current meter address
	// const currentMeterAdrGps = {
	// 	lat: gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lat,
	// 	lng: gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lng,
	// };
	// console.log(`currentMeterAdrGps`, currentMeterAdrGps);

	const [astGps, setAstGps] = useState({
		lat: gcData?.data?.form?.values?.astData?.[`${astCat}`][0]?.trnData?.astAdr
			?.gps?.lat,
		lng: gcData?.data?.form?.values?.astData?.[`${astCat}`][0]?.trnData?.astAdr
			?.gps?.lng,
	});
	// console.log(`astGps`, astGps);

	const [map, setMap] = useState();
	// const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
	// const [infoWindowData, setInfoWindowData] = useState();
	// const [center, setCenter] = useState(null);
	// const [bounds, setBounds] = useState(null);
	const [address, setAddress] = useState(
		gcData?.data?.form?.values?.astData?.[`${astCat}`][0]?.trnData?.astAdr?.adr
	);

	// const points = erfs?.map(erf => {
	// 	// console.log(`erf`, erf);
	// 	// const lat = erf.address.gps.latitude;
	// 	// const lng = erf.address.gps.longitude;

	// 	return {
	// 		type: "Feature",
	// 		properties: { cluster: false, erfId: erf.id, erf: erf },
	// 		geometry: {
	// 			type: "Point",
	// 			coordinates: [
	// 				parseFloat(erf.address.gps.longitude),
	// 				parseFloat(erf.address.gps.latitude),
	// 			],
	// 		},
	// 	};
	// });
	// console.log(`points`, points);

	// const { clusters, supercluster } = useSupercluster({
	// 	points,
	// 	bounds,
	// 	zoom,
	// 	options: { radius: 75, maxZoom: 20 },
	// });
	// console.log(`clusters`, clusters);

	// get currnet user data
	// const { user } = useAuthContext();
	// console.log(`user`, user)

	const { data, isOpened } = gcData;
	// console.log(`data`, data);
	const openGeocodingApp = isOpened ? "show-gc-app" : "hide-gc-app";

	// useEffect(() => {}, []);

	const closeGeocodingApp = e => {
		e.preventDefault();
		setGcData({
			data: {},
			isOpened: false,
		});
	};

	const onDragEnd = e => {
		// e.preventDefault()
		console.log(`end of drag`, e);
		const newAstGps = new window.google.maps.LatLng(
			e.latLng.lat(),
			e.latLng.lng()
		);

		setAstGps(newAstGps);

		if (Geocode) {
			// console.log(`Geocode`, Geocode);
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
			Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng())
				.then(response => {
					// console.log(`response`, response);
					const address = response.results[0].formatted_address;
					// console.log(address);
					setAddress(address);
					// if (astCat) {
					console.log(`astCat`, astCat);

					gcData.data.form.setFieldValue(
						`astData[${astCat}][0].trnData.astAdr.adr`,
						address
					);
					gcData.data.form.setFieldValue(
						`astData[${astCat}][0].trnData.astAdr.gps.lat`,
						e.latLng.lat()
					);
					gcData.data.form.setFieldValue(
						`astData[${astCat}][0].trnData.astAdr.gps.lng`,
						e.latLng.lng()
					);
					// }
				})
				.catch(error => {
					console.error(`Error reverse geocoding: `, error);
					setAddress("address NOT avaiable");
					gcData.data.form.setFieldValue(
						`astData[${astCat}][0].trnData.astAdr.adr`,
						"address NOT avaiable - try manual (GPS is Correct though)"
					);
					gcData.data.form.setFieldValue(
						`astData[${astCat}][0].trnData.astAdr.gps.lat`,
						e.latLng.lat()
					);
					gcData.data.form.setFieldValue(
						`astData[${astCat}][0].trnData.astAdr.gps.lng`,
						e.latLng.lng()
					);
				});
		}
	};

	useEffect(() => {
		setAddress(
			gcData?.data?.form?.values?.astData?.[`${astCat}`][0]?.trnData?.astAdr?.adr
		);
		// return setGcData({
		// 	data: {},
		// 	isOpened: false,
		// });
	}, [gcData, setGcData, astCat]);

	useEffect(() => {
		// console.log(`userGps`, userGps);
		gcData?.data?.form?.values?.astData?.[`${astCat}`][0]?.trnData?.astAdr?.gps
			.lat
			? setAstGps({
					lat: gcData?.data?.form?.values?.astData?.[`${astCat}`][0]?.trnData?.astAdr
						?.gps?.lat,
					lng: gcData?.data?.form?.values?.astData?.[`${astCat}`][0]?.trnData?.astAdr
						?.gps?.lng,
			  })
			: setAstGps({
					lat: gcData?.data?.form?.values?.erfData?.address?.gps?.latitude,
					lng: gcData?.data?.form?.values?.erfData?.address?.gps?.longitude,
					// lat: userGps?.coordinates?.lat,
					// lng: userGps?.coordinates?.lng,
					// lat: -27.42526206328501,
					// lng: 30.81783694804052,
			  });
	}, [userGps, gcData, astCat]);

	useEffect(() => {
		if (map) {
			// map.data.loadGeoJson(edumbe);
			// map.data.loadGeoJson(lesedi);
			map.data.setStyle({
				fillOpacity: 0.0,
			});
		}
	}, [map]);

	const onMapLoad = mapObjects => {
		// console.log(`myMapObjects`, mapObjects);
		const { map, maps } = mapObjects;
		// console.log(`mapRef`, mapRef);
		mapRef.current = map;
		// console.log(`mapRef`, mapRef);
		// console.log(`clusters`, clusters);
		// mapRef.current?.data?.loadGeoJson(edumbe);
		mapRef.current?.data?.loadGeoJson(lesediObedNkosiA);
		mapRef.current?.data?.setStyle({
			fillOpacity: 0.0,
		});
		// mapRef.data.addListener("click", handleErfClick);

		let marker = new maps.Marker({
			position: { lat: astGps?.lat, lng: astGps?.lng },
			map,
			draggable: true,
		});
		// console.log(`marker`, marker);
		marker.addListener("dragend", onDragEnd);
	};

	return (
		<div className={`geocoding-app ${openGeocodingApp}`}>
			<div className="header">
				<div className="header-subsection header-name">
					<h3 className="data-emphasis">{`${astCat} Address`}</h3>
				</div>
				<div className="header-subsection address">
					<button>{address ? address : "ast ddress"}</button>
				</div>
				<div className="header-subsection ast-no">
					<h3 className="data-emphasis">
						{gcData?.data?.form?.values?.astData?.[`${astCat}`][0].astData?.astNo}{" "}
					</h3>
				</div>
				<div className="header-subsection geocoding-app-close-btn">
					<button onClick={closeGeocodingApp}>X</button>
				</div>
			</div>
			<div className="body">
				{/* display map */}
				<div className="geocoding-map">
					<GoogleMapReact
						bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
						defaultCenter={astGps}
						// center={{ lat: userGps.coordinates.lat, lng: userGps.coordinates.lng }}
						center={astGps}
						zoom={18}
						yesIWantToUseGoogleMapApiInternals
						onGoogleApiLoaded={onMapLoad}
						onChange={({ zoom, bounds }) => {
							setZoom(zoom);
							setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
						}}
					>
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

export default GeocodingApp;
