import React, { createContext, useState } from "react";

// Create context:
// UserContext: to query the context state
export const PhotoAppContext = createContext();

const intiValue = {
	data: "",
	isPhotoAppOpened: false,
	ml1: "",
};

// A "provider" is used to encapsulate only the components that needs the state in this context
const PhotoAppContextProvider = props => {
	// console.log(`props`, props);
	const [photoAppData, setPhotoAppData] = useState(intiValue);
	// console.log(`photoAppData`, photoAppData);
	return (
		<PhotoAppContext.Provider value={{ photoAppData, setPhotoAppData }}>
			{props.children}
		</PhotoAppContext.Provider>
	);
};

export default PhotoAppContextProvider;
