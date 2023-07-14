import React, { useEffect, useState } from "react";
import PoiTable from "../../../tables/poi/PoiTable";
import FormShowHideSection from "../formShowHideSection/FormShowHideSection";

const FormSectionPoItems = ({ po, setPo, active, setActive }) => {
	const [poItemsTotals, setPoItemsTotals] = useState(0);

	useEffect(() => {
		// console.log(`po.poPi`, po.poPi);
		setPoItemsTotals(
			po.poPi &&
				po.poPi.reduce(
					(accum, current) => (accum = accum + current.itemQuantity),
					0
				)
		);
	}, [po.poPi]);
	// console.log(`sectionStates`, sectionStates);
	return (
		// fs - form section
		// fsh - form section header
		// fsb - form section body
		// fspoi - form section purchase order items
		<div className={`fs fs-poi`}>
			<div className="fsh">
				<div className="open-colse-icons">
					<FormShowHideSection
						sectionName={"poitable"}
						active={active}
						setActive={setActive}
					/>
				</div>
				<div>
					<p>Purchase Order Items</p>
				</div>
			</div>
			<div
				className={`fsb fsb-poi ${
					active === "poitable" ? "showSection" : "hideSection"
				}`}
			>
				<div className="fs fs-po-items">
					<div className="fs-po-items-title">
						<p className="fs-title">Po Items</p>
						<p className="fs-title-totals">Total Po Quantites {poItemsTotals}</p>
					</div>
					<PoiTable po={po} setPo={setPo} />
				</div>
			</div>
		</div>
	);
};

export default FormSectionPoItems;
