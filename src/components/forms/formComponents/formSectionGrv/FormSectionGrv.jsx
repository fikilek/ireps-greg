import React from "react";
import FormShowHideSection from "../formShowHideSection/FormShowHideSection";
import FormSectionStores from "../formSectionStores/FormSectionStores";
import FormSectionPoUser from "../formSectionPoUser/FormSectionPoUser";

const FormSectionGrv = ({ po, setPo, active, setActive }) => {
	return (
		// fs - form section
		// fsh - form section header
		// fsb - form section body
		// fs-rws = form section receipt - witness - stores
		<div className={`fs fs-grv `}>
			<div className="fsh">
				<div className="open-colse-icons">
					<FormShowHideSection
						sectionName={"grv"}
						active={active}
						setActive={setActive}
					/>
				</div>
				<div>
					<p>Goosds Receiving</p>
				</div>
			</div>
			<div
				className={`fsb fsb-grv ${
					active === "grv" ? "showSection" : "hideSection"
				}`}
			>
				<FormSectionPoUser po={po} setPo={setPo} signatureName="receiver" />
				<FormSectionPoUser po={po} setPo={setPo} signatureName="witness" />
				<FormSectionStores po={po} setPo={setPo} />
			</div>
		</div>
	);
};

export default FormSectionGrv;
