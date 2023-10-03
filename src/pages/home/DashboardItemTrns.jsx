import React from "react";

const DashboardItemTrns = props => {
	const { trnsData } = props;
	return (
		<div className="trns-body">
			{trnsData.items?.map((trn, index) => {
				return (
					<div key={index} className={`trns ${trn.trnType}`} title={""}>
						<div className="wrapper">
							<h2 className="trn-type">{`${trn.trnType}s`}</h2>
							<h1 className="total">{trn.total}</h1>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default DashboardItemTrns;
