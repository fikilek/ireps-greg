import React from "react";

const DashboardItemErfs = props => {
	const { erfsData } = props;
	return (
		<div className="erfs-body">
			{erfsData.items?.map((erf, index) => {
				return (
					<div
						key={index}
						className={`erfs ${
							erf.erfStatus === "not developed" ? "not-developed" : erf.erfStatus
						}`}
						title={""}
					>
						<div className="wrapper">
							<h2 className="erf-status">{erf.erfStatus}</h2>
							<h1 className="total">{erf.total}</h1>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default DashboardItemErfs;
