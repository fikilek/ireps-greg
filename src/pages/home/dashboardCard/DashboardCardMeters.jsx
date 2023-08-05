import React from "react";
import DashboardCardItem from "../dashBoardCardItem/DashboardCardItem";
import "./DashboardCardMeters.css";
import DashboardCardChartMeters from "./DashboardCardChartMeters";

const DashboardCardMeters = props => {
	// console.log(`props`, props)
	const { name, dcData } = props;
	const { metersData } = dcData;
	const { phase, type, total } = metersData;

	return (
		<div className="dashboard-card-meters">
			<div className="header">
				<h3 className="name" title={name}>
					{name} : {total}
				</h3>
			</div>
			<div className="body">
				<div className="line1">
					<div className="chart" items={phase}>
						<DashboardCardChartMeters items={phase} name={"Phase Chart"} />
					</div>
					<div style={{ color: "blue" }}>
					{phase &&
						phase.map((item, index) => {
							// console.log(`item`, item)
							return (<DashboardCardItem index={index} item={item} />);
						})}
					</div>
				</div>
				<div className="line1">
					<div className="chart" items={type}>
						<DashboardCardChartMeters items={type} name={"Meters Chart"} />
					</div>
					<div style={{ color: "blue" }}>
					{type &&
						type.map((item, index) => {
							// console.log(`item`, item)
							return (<DashboardCardItem index={index} item={item} />);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardCardMeters;
