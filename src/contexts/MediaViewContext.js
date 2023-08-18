import React, { createContext, useState } from "react";

export const MediaViewContext = createContext();

const MediaViewContextProvider = props => {
	const [mediaViewData, setMediaViewData] = useState(null);
	// console.log(`mediaViewData`, mediaViewData);
	return (
		<MediaViewContext.Provider value={{ mediaViewData, setMediaViewData }}>
			{props.children}
		</MediaViewContext.Provider>
	);
};

export default MediaViewContextProvider;
