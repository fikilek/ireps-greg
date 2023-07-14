import React, { useEffect, useState } from "react";
import AstsTotalsCard from "../../components/astsTotals/AstsTotalsCard";
import totals2 from "../../images/totals2.png";

const DbdTotals = ({ totals }) => {
	const [grandTotal, setGrandTotal] = useState({
		name: "Totals",
		asts_quantities: 0,
		trns_quantities: 0,
		astImg: totals2,
	});

	useEffect(() => {
		const all_totals = totals.reduce((tots, current) => {
			return {
				...tots,
				asts_quantities: tots.asts_quantities + current.asts_quantities,
				trns_quantities: tots.trns_quantities + current.trns_quantities,
			};
		});
		setGrandTotal({
			...grandTotal,
			asts_quantities: all_totals.asts_quantities,
			trns_quantities: all_totals.trns_quantities,
		});
	}, [totals]);

	return (
		<div className="dbd-body-ast-totals">
			<div className="dbd-body-totals">
				<AstsTotalsCard item={grandTotal} />
			</div>
			{totals &&
				totals.map(item => (
					<div className="dbd-body-ast-total" key={item.name}>
						<AstsTotalsCard item={item} />
					</div>
				))}
		</div>
	);
};

export default DbdTotals;
