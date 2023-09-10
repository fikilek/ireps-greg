import React from "react";
import DatetimeFilter from "./DatetimeFilter";
import "./UserProfile.css";
import "./UserTrnsStats.css";
import TrnsStats from './TrnsStats'
import AreaFilter from "./AreaFilter";

const UserTrnsStats = () => {
	const stats = [
		// { name: "installation", total: 2 },
		// { name: "commissioning", total: 23 },
		{ name: "audit", total: 2312 },
		{ name: "inspection", total: 23 },
		// { name: "sale", total: 23 },
		// { name: "returns", total: 23 },
		// { name: "missing", total: 23 },
		// { name: "found", total: 23 },
		// { name: "vending", total: 23 },
		// { name: "grv", total: 23 },
		// { name: "discommissioning", total: 23 },
		// { name: "disposal", total: 23 },
		{ name: "tid", total: 1432 },
	];
	return (
		<div className="user-data user-trns-stats">
			<div className="header">
				<h3>User Transactions Stats</h3>
				<div>
					Total Trns: <span className="data-emphasis">{"243"}</span>
				</div>
			</div>
			<div className="body user-trns-stats-body">
				<div className="body-section filters">
					<DatetimeFilter />
					<AreaFilter />
				</div>
				<div className="body-section trns">
					<TrnsStats stats={stats} />
				</div>
			</div>
		</div>
	);
};

export default UserTrnsStats;
