import React from "react";

const DashboardItemAsts = props => {
	const { astsData } = props;
	return (
		<div className="asts-body">
			{astsData.items?.map((ast, index) => {
				return (
					<div key={index} className={`assets ${ast.astCat}`} title={""}>
						<div className="wrapper">
							<h2 className="ast-cat">{`${ast.astCat}s`}</h2>
							<h1 className="total">{ast.total}</h1>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default DashboardItemAsts;
