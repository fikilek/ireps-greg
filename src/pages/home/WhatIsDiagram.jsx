import React from "react";
import "./WhatIsDiagram.css";

const WhatIsDiagram = props => {
	// console.log(`props`, props);
	const { image } = props;
	return (
		<div className="what-is-diagram">
			<img src={image.img} alt={image.alt} width={"100%"} height={"auto"} />
		</div>
	);
};

export default WhatIsDiagram;
