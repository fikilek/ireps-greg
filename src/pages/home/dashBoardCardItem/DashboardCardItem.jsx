import React from "react";
import "./DashboardCardItem.css";

const DashboardCardItem = props => {
	const { item, index } = props;
	const objEntries = Object.entries(item);
	// console.log(`objEntries[0][0] - name`, objEntries[0][0]);
	// console.log(`objEntries[0][1] - value`, objEntries[0][1]);
	const name = objEntries[0][0];
	const total = objEntries[0][1];

	return (
		<div key={index} className="dashboard-card-item">
			<div className="total">
				<h3 className="title">{name}</h3>
				<h2 className="number">{total}</h2>
			</div>
		</div>
	);
};

export default DashboardCardItem;
