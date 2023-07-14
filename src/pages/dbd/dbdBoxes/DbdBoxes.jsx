import React from "react";
import { useParams } from "react-router-dom";

const DbdBoxes = () => {
	const { ml2, ml3 } = useParams();
	console.log(`ml2`, ml2);
	console.log(`ml3`, ml3);
	return <div>DbdBoxes</div>;
};

export default DbdBoxes;
