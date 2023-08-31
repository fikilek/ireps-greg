import React from "react";
// import FormSectionCreated from "../formSectionCreated/FormSectionCreated";
// import FormSectionUpdated from "../formSectionUpdated/FormSectionUpdated";
import FormShowHideSection from "../formShowHideSection/FormShowHideSection";

const FormSectionMetadata = ({ po, setPo, active, setActive }) => {
	// console.log(`sectionStates`, sectionStates);
	return (
		// fs - form section
		// fsh - form section header
		// fsb - form section body
		// fsuc - form section updated created
		<div className={`fs fs-uc`}>
			<div className="fsh">
				<div className="open-colse-icons">
					<FormShowHideSection
						sectionName={"metadata"}
						active={active}
						setActive={setActive}
					/>
				</div>
				<div>
					<p>Updated / Created</p>
				</div>
			</div>
			<div
				className={`fsb ${active === "metadata" ? "showSection" : "hideSection"}`}
			>
				{/* <FormSectionUpdated
					po={po}
					setPo={setPo}
					active={active}
					setActive={setActive}
				/>
				<FormSectionCreated
					po={po}
					setPo={setPo}
					active={active}
					setActive={setActive}
				/> */}
			</div>
		</div>
	);
};

export default FormSectionMetadata;
