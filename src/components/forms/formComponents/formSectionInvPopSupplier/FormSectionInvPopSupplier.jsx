import React from "react";
import FormShowHideSection from "../formShowHideSection/FormShowHideSection";
import FormSectionInvPop from "../formSectioninvPop/FormSectionInvPop";
import FormSectionSupplier from "../formSectionSupplier/FormSectionSupplier";

const FormSectionInvPopSupplier = ({ po, setPo, active, setActive }) => {
	// console.log(`sectionStates`, sectionStates);
	return (
		// fs - form section
		// fsh - form section header
		// fsb - form section body
		// fs-uc - form section updated created
		<div className={`fs fs-ipgs `}>
			<div className="fsh">
				<div className="open-colse-icons">
					<FormShowHideSection
						sectionName={"invpopgrvsupplier"}
						active={active}
						setActive={setActive}
					/>
				</div>
				<div>
					<p>Invoice / Payments / Supplier</p>
				</div>
			</div>
			<div
				className={`fsb ${
					active === "invpopgrvsupplier" ? "showSection" : "hideSection"
				}`}
			>
				<FormSectionInvPop po={po} setPo={setPo} />
				<FormSectionSupplier po={po} setPo={setPo} />
			</div>
		</div>
	);
};

export default FormSectionInvPopSupplier;
