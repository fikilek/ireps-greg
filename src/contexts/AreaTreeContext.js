import React, { createContext, useState } from "react";
// Create context:
export const AreaTreeContext = createContext();

const initAreaSetings = {
	name: "no area selected",
};

// A "provider" is used to encapsulate only the
// components that needs the state in this context
export const AreaTreeContextProvider = props => {
	// console.log(`props`, props);
	const [area, setArea] = useState(initAreaSetings);
	// console.log(`area`, area);
	return (
		<AreaTreeContext.Provider value={{ area, setArea }}>
			{props.children}
		</AreaTreeContext.Provider>
	);
};
