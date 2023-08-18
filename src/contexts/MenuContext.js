import React, { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuContextProvider = props => {
	// console.log(`props`, props);
	const [menuStatus, setMenuStatus] = useState(true);
	// console.log(`menuStatus`, menuStatus);
	return (
		<MenuContext.Provider value={{ menuStatus, setMenuStatus }}>
			{props.children}
		</MenuContext.Provider>
	);
};
