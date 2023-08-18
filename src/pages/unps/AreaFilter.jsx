import React from "react";
import "./AreaFilter.css";

const AreaFilter = () => {
	const areas = [
		{name: 'all', town: ''},
		{name: 'area1', town: ''},
		{name: 'area2', town: ''},
		{name: 'area3', town: ''},
		{name: 'area4', town: ''},
	]
	return (
		<div className="area-filter">
			<select>
				{areas?.map(area => {
					return (
						<option key={area.name} value={area.name}>
							{area.name}
						</option>
					);
				})}
			</select>
			<select>
				{areas?.map(area => {
					return (
						<option key={area.name} value={area.name}>
							{area.name}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default AreaFilter;
