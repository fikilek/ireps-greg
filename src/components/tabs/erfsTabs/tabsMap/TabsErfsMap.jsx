/* global google */
import {
	GoogleMap,
	MarkerF,
	Data,
	useLoadScript,
	InfoWindowF,
	DataF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import "./tabsErfsMap.css";
import marblehall from "../../../../data/cadastral/marblehall/marblehall.geojson";
import edumbe from "../../../../data/cadastral/edumbe/edumbe.geojson";

const TabsErfsMap = props => {
	// console.log(`props`, props);
	// console.log(`marblehall`, marblehall);

	const { rowData } = props;
	// console.log(`rowData`, rowData);

	const [erfs, setErfs] = useState([]);
	const [mapRef, setMapRef] = useState();
	const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
	const [infoWindowData, setInfoWindowData] = useState();
	// const [center, setCenter] = useState(null);
	const [bounds, setBounds] = useState(null);

	// console.log(`mapRef.data`, mapRef?.data);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});

	const handleErfClick = e => {
		console.log(`erf no`, e.feature.getProperty("TAG_VALUE"))
	}

	useEffect(() => {
		// setCenter({
		// 	houseNo: 5511,
		// 	lat: -32.31360146905143,
		// 	lng: 28.197136488027912,
		// });
		// console.log(`erfs`, erfs);
		erfs?.forEach(erf => {
			// console.log(`erf`, erf);
			// console.log(`latitude`, erf.gps.latitude);
			// console.log(`longitude`, erf.gps.longitude);
			const lat = erf.address.gps.latitude;
			const lng = erf.address.gps.longitude;
			bounds.extend({ lat, lng });
		});
		if (mapRef) {
			mapRef.fitBounds(bounds);
			mapRef.data.loadGeoJson(marblehall);
			mapRef.data.loadGeoJson(edumbe);
			mapRef.data.setStyle({
				fillOpacity: 0.0,
			});
			mapRef.data.addListener("click", handleErfClick);
		}
		setErfs(rowData);
	}, [rowData, bounds, mapRef, erfs]);

	// const markers = [
	// 	{ houseNo: 5519, lat: -32.31384462273046, lng: 28.198431832524996 },
	// 	{ houseNo: 5517, lat: -32.31376632850222, lng: 28.19737358379296 },
	// 	{ houseNo: 5513, lat: -32.31333327218569, lng: 28.197443768860307 },
	// 	{ houseNo: 5512, lat: -32.31347834952703, lng: 28.197269425277142 },
	// 	{ houseNo: 5511, lat: -32.31360146905143, lng: 28.197136488027912 }, // center
	// 	{ houseNo: 5510, lat: -32.31379343857748, lng: 28.19697706449921 },
	// 	{ houseNo: 5509, lat: -32.31392264744801, lng: 28.19679735649397 },
	// 	{ houseNo: 5508, lat: -32.31409719246029, lng: 28.19666056383641 },
	// 	{ houseNo: 5507, lat: -32.31424226857818, lng: 28.1964996312981 },
	// 	{ houseNo: 5506, lat: -32.31439867850751, lng: 28.196370885267456 },
	// 	{ houseNo: 5505, lat: -32.31452517739603, lng: 28.196201315000213 },
	// ];

	const onMapLoad = map => {
		const bounds = new google.maps.LatLngBounds();
		// console.log(`bounds`, bounds);
		setBounds(bounds);
		setMapRef(map);
	};

	const handleMarkerClick = (id, lat, lng, erfNo) => {
		mapRef?.panTo({ lat, lng });
		setInfoWindowData({ id, erfNo });
		setIsInfoWindowOpen(true);
	};

	const onInfoWindowLoad = infoWindow => {
		// console.log("infoWindow: ", infoWindow);
	};

	const onDomReady = domReady => {
		// console.log("domReady: ", domReady);
	};

	return (
		<div className="tabs-erfs-map">
			{!isLoaded ? (
				<h1>Loading...</h1>
			) : (
				<GoogleMap mapContainerClassName="map-container" onLoad={onMapLoad}>
					{erfs &&
						erfs.map(erf => {
							// console.log(`erf`, erf)
							const { erfNo, address, id } = erf;
							const { gps } = address;
							const { latitude, longitude } = gps;
							const lat = latitude ? latitude : 0;
							const lng = longitude ? longitude : 0;
							return (
								<MarkerF
									key={id}
									position={{ lat, lng }}
									label={`${erfNo}`}
									icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
									onClick={() => {
										handleMarkerClick(id, lat, lng, erfNo);
									}}
								>
									{isInfoWindowOpen && infoWindowData?.id === id && (
										<InfoWindowF
											onCloseClick={() => {
												setIsInfoWindowOpen(false);
											}}
											onLoad={onInfoWindowLoad}
											onDomReady={onDomReady}
										>
											<div>
												<h2>
													iREPS Form : <span>{infoWindowData.erfNo}</span>
												</h2>
												<p>form data</p>
												<button>Submit</button>
											</div>
										</InfoWindowF>
									)}
								</MarkerF>
							);
						})}
				</GoogleMap>
			)}
		</div>
	);
};

export default TabsErfsMap;
