import React from "react";

const TableBoxDimensions = params => {
	console.log(`params`, params);
	const box = params.data.astData.box || {};
	console.log(`box`, box);
	const { height, length, width } = box.dimensions || {};

	return (
		<>
			<span>{`L:${length} - `}</span>
			<span>{`W:${width} - `}</span>
			<span>{`H:${height}`}</span>
		</>
	);
};

export default TableBoxDimensions;
