import React from "react";
import "./astsTotalsCard.css";
import { astColors } from "../../data/colors/colors";

const AstsTotalsCard = ({ item }) => {
	// console.log(`item.name`, item.name)
	return (
		<div className={`astTotalsCard ast-${item.name}`}>
			<div className="ast-data">
				{/* total assets */}
				<div className="ast-data-name">asts</div>
				<div className="ast-total">{item.asts_quantities}</div>
			</div>
			<div className="ast-img">
				<div className="ast-name ">{item.name}</div>
				<img src={item.astImg} alt="asset image" width={50} height={50} />
			</div>
			<div className="trn-data">
				{/* total ransactions */}
				<div className="ast-data-name">trns</div>
				<div className="ast-total">{item.trns_quantities}</div>
			</div>
		</div>
	);
};

export default AstsTotalsCard;
