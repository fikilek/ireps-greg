import React from "react";
import DashboardCardItem from "../dashBoardCardItem/DashboardCardItem";
import "./DashboardCardMeters.css";
import DashboardCardChartMeters from "./DashboardCardChartMeters";
import DashboardCardChart from "./DashboardCardChart";

const DashboardCardMeters = props => {
	console.log(`props`, props);
	const { name, dcData } = props;
	const { metersData } = dcData;
	const { phase, type, total } = metersData;

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
					<div className="meters-data">
						<div className="meter-data">
							<DashboardCardChart items={phase} name={name} />
						</div>
						<div className="meter-data">
							<DashboardCardChart items={type} name={name} />
						</div>
					</div>
					{/* <div className="charts">
						<div className="chart chart-phase">
							<DashboardCardChart items={phase} name={"Phase Chart"} />
						</div>
						<div className="chart chart-type">
							<DashboardCardChart items={type} name={"Phase Chart"} />
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default DashboardCardMeters;
