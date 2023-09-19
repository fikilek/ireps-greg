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
import edumbe from "../../data/cadastral/edumbe/edumbe.geojson";
import useSupercluster from "use-supercluster";

// const Marker = ({ children }) => children;

const GeocodingApp = () => {
	const { gcData, setGcData } = useContext(GeocodingContext);
	// console.log(`gcData`, gcData);

	const mapRef = useRef();
	// console.log(`mapRef`, mapRef);

	const { erfs } = useContext(ErfsContext);

	// get geolocation
	// const [userGps, setUserGps] = useState(null);
	const { userGps } = useGeoLocation();
	// console.log(`location`, location);
	// console.log(`userGps`, userGps);
	// console.log(`erfs`, erfs);

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

	const [meterGps, setMeterGps] = useState({
		lat: gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lat,
		lng: gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lng,
	});
	// console.log(`meterGps`, meterGps);

	const [map, setMap] = useState();
	// const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
	// const [infoWindowData, setInfoWindowData] = useState();
	// const [center, setCenter] = useState(null);
	// const [bounds, setBounds] = useState(null);
	const [address, setAddress] = useState(
		gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.adr
	);

	const points = erfs?.map(erf => {
		// console.log(`erf`, erf);
		// const lat = erf.address.gps.latitude;
		// const lng = erf.address.gps.longitude;

		return {
			type: "Feature",
			properties: { cluster: false, erfId: erf.id, erf: erf },
			geometry: {
				type: "Point",
				coordinates: [
					parseFloat(erf.address.gps.longitude),
					parseFloat(erf.address.gps.latitude),
				],
			},
		};
	});
	// console.log(`points`, points);

	const { clusters, supercluster } = useSupercluster({
		points,
		bounds,
		zoom,
		options: { radius: 75, maxZoom: 20 },
	});
	// console.log(`clusters`, clusters);

	// get currnet user data
	const { user } = useAuthContext();
	// console.log(`user`, user)

	const { data, isOpened } = gcData;
	// console.log(`data`, data);
	const openGeocodingApp = isOpened ? "show-gc-app" : "hide-gc-app";

	// useEffect(() => {}, []);

	const closeGeocodingApp = e => {
		e.preventDefault();
		setGcData({
			...gcData,
			isOpened: false,
		});
	};

	const onDragEnd = e => {
		// e.preventDefault()
		// console.log(`end of drag`, e);
		const newMeterGps = new window.google.maps.LatLng(
			e.latLng.lat(),
			e.latLng.lng()
		);

		setMeterGps(newMeterGps);

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
				})
				.catch(error => {
					console.error(`Error reverse geocoding: `, error);
					setAddress("address NOT avaiable");
					gcData.data.form.setFieldValue(
						"astData[meter][0].trnData.astAdr.adr",
						"address NOT avaiable - try manual (GPS is Correct though)"
					);
					gcData.data.form.setFieldValue(
						"astData[meter][0].trnData.astAdr.gps.lat",
						e.latLng.lat()
					);
					gcData.data.form.setFieldValue(
						"astData[meter][0].trnData.astAdr.gps.lng",
						e.latLng.lng()
					);
				});
		}
	};

	useEffect(() => {
		setAddress(gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.adr);
	}, [gcData]);

	useEffect(() => {
		// console.log(`userGps`, userGps);
		gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lat
			? setMeterGps({
					lat: gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lat,
					lng: gcData?.data?.form?.values?.astData?.meter[0].trnData.astAdr.gps.lng,
			  })
			: setMeterGps({
					lat: gcData?.data?.form?.values?.erfData?.address.gps.latitude,
					lng: gcData?.data?.form?.values?.erfData?.address.gps.longitude,
					// lat: userGps?.coordinates?.lat,
					// lng: userGps?.coordinates?.lng,
					// lat: -27.42526206328501,
					// lng: 30.81783694804052,
			  });
	}, [userGps, gcData]);

	useEffect(() => {
		if (map) {
			map.data.loadGeoJson(edumbe);
			map.data.setStyle({
				fillOpacity: 0.0,
			});
		}
	}, [map]);

	const onMapLoad = mapObjects => {
		console.log(`myMapObjects`, mapObjects);
		const { map, maps } = mapObjects;
		// console.log(`mapRef`, mapRef);
		mapRef.current = map;
		// console.log(`mapRef`, mapRef);
		// console.log(`clusters`, clusters);
		mapRef.current?.data?.loadGeoJson(edumbe);
		mapRef.current?.data?.setStyle({
			fillOpacity: 0.0,
		});
		// mapRef.data.addListener("click", handleErfClick);

		let marker = new maps.Marker({
			position: { lat: meterGps.lat, lng: meterGps.lng },
			map,
			draggable: true,
		});
		console.log(`marker`, marker);
		marker.addListener("dragend", onDragEnd);
	};

	return (
		<div className={`geocoding-app ${openGeocodingApp}`}>
			<div className="header">
				<div className="header-subsection header-name">
					<h3 className="data-emphasis">Meter Address</h3>
				</div>
				<div className="header-subsection address">
					<button>{address ? address : "No Address"}</button>
				</div>
				<div className="header-subsection ast-no">
					<h3 className="data-emphasis">
						{gcData?.data?.form?.values?.astData?.meter[0].astData.astNo}{" "}
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
						center={meterGps}
						zoom={18}
						yesIWantToUseGoogleMapApiInternals
						onGoogleApiLoaded={onMapLoad}
						// onChange={({ zoom, bounds }) => {
						// 	setZoom(zoom);
						// 	setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
						// }}
					>
						{/* {clusters.map(cluster => {
							// console.log(`cluster?.properties?.erf`, cluster?.properties?.erf);
							const [longitude, latitude] = cluster.geometry.coordinates;
							const { cluster: isCluster, point_count: pointCount } =
								cluster.properties;
							const erfNo = cluster?.properties?.erf?.erfNo;
							// const id = cluster?.properties?.erf?.id;

							if (isCluster) {
								return (
									<Marker key={`${cluster.id}`} lat={latitude} lng={longitude}>
										<div
											className="cluster-marker"
											style={{
												width: `${10 + (pointCount / points.length) * 20}px`,
												height: `${10 + (pointCount / points.length) * 20}px`,
											}}
											onClick={() => {
												const expansionZoom = Math.min(
													supercluster.getClusterExpansionZoom(cluster.id),
													20
												);
												mapRef.current.setZoom(expansionZoom);
												mapRef.current.panTo({ lat: latitude, lng: longitude });
											}}
										>
											{pointCount}
										</div>
									</Marker>
								);
							}

							return (
								<Marker
									key={`${cluster.properties.erfId}`}
									lat={latitude}
									lng={longitude}
								>
									<button
										className="erf-marker"
										// onClick={() => handleMarkerClick(id, latitude, longitude)}
									>
										<span className="erf-no">{erfNo}</span>
									</button>
								</Marker>
							);
						})} */}

						{/* <Marker
							lat={userGps.lat}
							lng={userGps.lng}
							draggable={true}
							// onDragEnd={onDragEnd}
						>
							<img
								src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
								alt="xx"
							/>
						</Marker> */}
					</GoogleMapReact>
				</div>
			</div>
			<div className="footer"></div>
		</div>
	);
};

export default GeocodingApp;
