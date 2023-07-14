import React, { useMemo } from "react";
import "./PoTooltip.css";

const PoTooltip = props => {
	console.log(`props`, props);
	const data = useMemo(
		() => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
		[]
	);
	console.log(`data`, data);

	return (
		<div
			className="custom-tooltip"
			style={{ backgroundColor: props.color || "white" }}
		>
			<p>
				<span>{data.athlete}</span>
			</p>
			<p>
				<span>Country: </span> {data.country}
			</p>
			<p>
				<span>Total: </span> {data.total}
			</p>
		</div>
	);
};

export default PoTooltip;
