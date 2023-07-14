import React, { createContext, useState } from "react";
import { userObj } from "../data/signData/signData";
// Create context:
// UserContext: to query the context state
export const UserContext = createContext();

// A "provider" is used to encapsulate only the
// components that needs the state in this context
export const UserContextProvider = props => {
	// console.log(`props`, props);
	const [user, setUser] = useState(userObj);
	// console.log(`componentToOpen`, componentToOpen);
	// console.log(`user`, user)
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{props.children}
		</UserContext.Provider>
	);
};
