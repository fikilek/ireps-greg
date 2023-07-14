import React from "react";
import "./poi.css";

const PoiComponentInput = props => {
	console.log(`props`, props);
	const { poiName, poiPlaceHolder, poiValue } = props;
	const handleChange = e => {
		e.preventDefault();
		console.log(`input changed`, e);
	};
	return (
		<div className="piComponentInput">
			<input
				type="text"
				name={poiName}
				value={poiValue}
				onChange={handleChange}
				placeholder={poiPlaceHolder}
			/>
		</div>
	);
};

export default PoiComponentInput;
