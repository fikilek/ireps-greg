import React from "react";
import { useErf } from "../../../../hooks/useErf";
import useModal from "../../../../hooks/useModal";
import FormHeader7 from "../../../forms/formComponents/formHeaders/FormHeader7";
import TabsErfMapInfo from "./TabsErfMapInfo";
import "./TabsErfMapInfoWrapper.css";

const TabsErfMapInfoWrapper = props => {
	// console.log(`props`, props);
	const { erf } = props;
	const { getNoOfAstsInErf } = useErf(erf)
	const noOfAstsInErf = getNoOfAstsInErf()
	const asts = props?.erf?.asts;
	const trnsInErf = asts?.length

	const { closeModal } = useModal();

	return (
		<div className="tabs-erf-map-info-wrapper">
			<div className="temiw-container">
				<FormHeader7
					erfNo={erf.erfNo}
					trnsInErf={trnsInErf}
					noOfAstsInErf={noOfAstsInErf}
					closeModal={closeModal}
				/>
				<TabsErfMapInfo erf={erf} />
			</div>
		</div>
	);
};

export default TabsErfMapInfoWrapper;
