import React from "react";
import useCreateTrnFromErf from "../../../../hooks/useCreateTrnFromErf";
import { useErf } from "../../../../hooks/useErf";
import useModal from "../../../../hooks/useModal";
import FormHeader8 from "../../../forms/formComponents/formHeaders/FormHeader8";
import TabsErfMapInfo from "./TabsErfMapInfo";
import "./TabsErfMapInfoWrapper.css";

const TabsErfMapInfoWrapper = props => {
	// console.log(`props`, props);
	const { erf } = props;

	const { createTrnFromErf } = useCreateTrnFromErf(erf);

	const { getNoOfAstsInErf } = useErf(erf);
	let noOfAstsInErf = getNoOfAstsInErf();
	const asts = props?.erf?.asts;
	let noOfTrnsInErf = asts?.length;

	const { closeModal } = useModal();

	// form header dataL

	// erf no
	const erfNo = (
		<>
			Erf No <span className="data-emphasis">{erf?.erfNo}</span>.
		</>
	);

	// erf property type
	const propertyType = (
		<>
			<span className="data-emphasis">{`${erf?.propertyType?.unitName} - ${erf?.propertyType?.unitNo}`}</span>
		</>
	);

	// no of asts in erf
	noOfAstsInErf = (
		<>
			Asts in Erf <span className="data-emphasis">{noOfAstsInErf}</span>.
		</>
	);

	// no of trns in erf
	noOfTrnsInErf = (
		<>
			Trns in Erf <span className="data-emphasis">{noOfTrnsInErf}</span>.
		</>
	);

	// anomalies
	const noOfAnomalies = 3;
	const anomalies = (
		<button className="anomalies">
			<span>Anomalies</span> &nbsp;&nbsp;
			<span className="data-emphasis">{` ${noOfAnomalies}`}</span>
		</button>
	);

	const createNewTrn = e => {
		console.log(`createNewTrn`);
		createTrnFromErf();
	};

	return (
		<div className="tabs-erf-map-info-wrapper">
			<div className="temiw-container">
				<FormHeader8
					// erf no- dataLl
					dataLl={erfNo}
					// property type
					dataLm={propertyType}
					// no of asts in erf = dataLr
					dataLr={noOfAstsInErf}
					// no of trns in erf
					dataRl={noOfTrnsInErf}
					// anomalies
					dataRr={""}
					closeModal={closeModal}
				>
					<button onClick={createNewTrn} className="nt-btn">
						New Trn
					</button>
				</FormHeader8>
				<TabsErfMapInfo erf={erf} />
			</div>
		</div>
	);
};

export default TabsErfMapInfoWrapper;
