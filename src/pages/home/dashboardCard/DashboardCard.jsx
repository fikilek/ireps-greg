import React from "react";
import DashboardCardItem from "../dashBoardCardItem/DashboardCardItem";
import "./DashboardCard.css";
import DashboardCardChart from "./DashboardCardChart";

const DashboardCard = props => {
	// console.log(`props`, props);
	const { name, dcData } = props;
	const { total, items } = dcData;

	return (
		<div className="dashboard-card">
			<div className="header">
				<h3 className="name" title={name}>
					{name}
				</h3>
			</div>

			<div className="body">
				<div className="line1">
					<div className="total">
						<h3 className="number">{total}</h3>
					</div>
					<div className="total">
						<DashboardCardChart items={items} name={name} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardCard;
