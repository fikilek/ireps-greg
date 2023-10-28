import { useState, useEffect } from "react";

const useGeoLocation = () => {
	const [userGps, setUserGps] = useState({
		loaded: false,
		coordinates: { lat: "", lng: "" },
	});
	// console.log(`userGps.coordinates`, userGps.coordinates);

	const onSuccess = userPositionGps => {
		// console.log(`userGps`, userGps);
		// console.log(`userPositionGps`, userPositionGps);

		// if (
		// 	userGps.coordinates.lat !== userPositionGps.coords.latitude &&
		// 	userGps.coordinates.lng !== userPositionGps.coords.longitude
		// ) {
		setUserGps({
			loaded: true,
			coordinates: {
				lat: userPositionGps.coords.latitude,
				lng: userPositionGps.coords.longitude,
			},
		});
		// }
	};

	const onError = error => {
		setUserGps({
			loaded: false,
			error: {
				code: error.code,
				message: error.message,
			},
		});
	};

	const options = {
		enableHighAccuracy: true,
		// timeout: 10000,
		maximumAge: 0,
	};

	useEffect(() => {
		if (!("geolocation" in navigator)) {
			onError({
				code: 0,
				message: "Geolocation not supported",
			});
		}
		navigator.geolocation.watchPosition(onSuccess, onError, options);
	}, []);

	const getGeolocation = () => userGps;

	const setGeolocation = () => {
		// console.log(`navigator.geolocation`, navigator.geolocation);
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	};

	return { getGeolocation, setGeolocation, userGps };
};

export default useGeoLocation;
