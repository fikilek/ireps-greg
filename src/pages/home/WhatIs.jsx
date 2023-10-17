import React from "react";

const WhatIs = props => {
	const { header, whatIsType, children, topic } = props;
	return (
		<div className="what-is">
			<div className="what-is-header">{header}</div>
			{/* body - 1fr */}
			<div className={`${whatIsType} ${topic}`}>{children}</div>
		</div>
	);
};

export default WhatIs;
