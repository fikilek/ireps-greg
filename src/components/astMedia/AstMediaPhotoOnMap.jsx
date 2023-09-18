import GoogleMapReact from "google-map-react";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import "./AstMediaPhotoOnMap.css";

const AstMediaPhotoOnMap = props => {
	// console.log(`props`, props);

	const { mapShown, setMapShown } = props;

	// const { isLoaded } = useLoadScript({
	// 	googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	// });
	// console.log(`isLoaded`, isLoaded);

	const [center, setCenter] = useState({ lat: 0, lng: 0 });

	// useEffect(() => {
	// 	if (props?.mediaToShow?.media && isLoaded) {
	// 		const lat = Number(props?.mediaToShow?.media?.metaData?.customMetadata.lat);
	// 		const lng = Number(props?.mediaToShow?.media?.metaData?.customMetadata.lng);
	// 		// console.log(`lat`, lat);
	// 		// console.log(`lng`, lng);

	// 		const mapCenter = new window.google.maps.LatLng(lat, lng);
	// 		// console.log(`mapCenter`, mapCenter);
	// 		setCenter(mapCenter);
	// 	}
	// }, [props?.mediaToShow?.media, isLoaded, props]);

	const [map, setMap] = useState();
	//

	const onMapLoad = map => {
		setMap(map);
	};

	const onUnmount = useCallback(map => {
		setMap(null);
	}, []);

	const showHide = mapShown ? "show-map" : "hide-map";

	const closeMap = e => {
		e.preventDefault();
		console.log(`closing map`);
		setMapShown(false);
	};

	return (
		<div className={`ast-media-photo-on-map ${showHide} `}>
			{true ? (
				<div className="map">
					<div className="map-header">
						<button className="mh map-close-btn" onClick={closeMap}>
							X
						</button>
						<p className="mh map-name">Location where photo was taken</p>
					</div>
					<GoogleMapReact
						bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
						mapContainerClassName="map-container"
						onLoad={onMapLoad}
						center={center}
						zoom={20}
						onUnmount={onUnmount}
					>
						{/* <MarkerF position={center}></MarkerF> */}
						{/* <MarkerF position={{ lat, lng }} ></MarkerF> */}
					</GoogleMapReact>
				</div>
			) : (
				<p>map loadig ...</p>
			)}
		</div>
	);
};

export default AstMediaPhotoOnMap;
