import React from "react";
import "./WhatIsContent.css";

const WhatIsContent = props => {
	// console.log(`props`, props);
	const { content } = props;
	return <div className="what-is-content">{content}</div>;
};

export default WhatIsContent;
