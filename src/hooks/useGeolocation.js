import { useState, useEffect } from "react";

const useGeoLocation = () => {
	const [userGps, setUserGps] = useState({
		loaded: false,
		coordinates: { lat: "", lng: "" },
  });
  // console.log(`userGps`, userGps)

	const onSuccess = userGps => {
		// console.log(`userGps`, userGps)
		setUserGps({
			loaded: true,
			coordinates: {
				lat: userGps.coords.latitude,
				lng: userGps.coords.longitude,
			},
		});
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

	useEffect(() => {
		if (!("geolocation" in navigator)) {
			onError({
				code: 0,
				message: "Geolocation not supported",
			});
		}
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  
  const getGeolocation = () => userGps

  const setGeolocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  return { getGeolocation, setGeolocation, userGps };
};

export default useGeoLocation;
