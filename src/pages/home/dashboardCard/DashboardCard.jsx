import React from "react";
import DashboardCardItem from "../dashBoardCardItem/DashboardCardItem";
import "./DashboardCard.css";
import DashboardCardChart from "./DashboardCardChart";

const DashboardCard = props => {
	// console.log(`props`, props)
	const { name, dcData } = props;
	const { total, items } = dcData;
	let frs = "";
	items?.forEach(item => {
		frs = frs + ' 1fr'
	});
	// console.log(`frs`, frs);
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
						<h3 className="title">Total</h3>
						<h3 className="number">{total}</h3>
					</div>
					<div className="chart" items={items}>
						<DashboardCardChart items={items} name={name} />
					</div>
				</div>
				<div
					className={`line2 cols${items.length}`}
					style={{ color: "blue", "gridTemplateColumns": frs }}
				>
					{items &&
						items.map((item, index) => {
							// console.log(`item`, item)
							return <DashboardCardItem index={index} item={item} />;
						})}
				</div>
			</div>
		</div>
	);
};

export default DashboardCard;
