import React from "react";

const DashboardItemWrapper = props => {
	const { astCat, total, title } = props;
	return (
		<div className={`lp-sub-section ${astCat}`} title={title}>
			<div className="lp-header">
				<p>Total {astCat}</p> <p className={`lp-header-total-${astCat}`}>{total}</p>
			</div>
			{props.children}
		</div>
	);
};

export default DashboardItemWrapper;
