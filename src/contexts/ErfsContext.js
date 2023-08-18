import React, { createContext, useEffect, useState } from "react";
import useCollection from "../hooks/useCollection";

// Create context:
export const ErfsContext = createContext();

const ErfsContextProvider = props => {
	const { data } = useCollection("erfs");
	// console.log(`data`, data)

	// console.log(`props`, props);
	const [erfs, setErfs] = useState(data);
	// console.log(`erfs`, erfs);

	useEffect(() => {
		setErfs(data);
	}, [data]);

	return (
		<ErfsContext.Provider value={{ erfs, setErfs }}>
			{props.children}
		</ErfsContext.Provider>
	);
};

export default ErfsContextProvider;
