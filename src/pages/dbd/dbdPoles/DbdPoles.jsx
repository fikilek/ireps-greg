import React from "react";
import { useParams } from "react-router-dom";

const DbdPoles = () => {
	const { ml2, ml3 } = useParams();
	console.log(`ml2`, ml2);
	console.log(`ml3`, ml3);
	return <div>DbdPoles</div>;
};

export default DbdPoles;
