import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const MeterReconnectionJsx = props => {
	const { ast, trn, astCat, astCatIndex } = props;

	return (
		<FormSectionTrn trn={trn} ast={ast} astCat={astCat} astCatIndex={astCatIndex}>
			<div className="ast">
				<div className="row-1 ast-row read-only-row">
					<div className="data">
						<p className="data-header">Asset Data</p>
						<p>
							Meter No - <span>{ast?.astData.astNo}</span>
						</p>
						<p>
							Meter Phase - <span>{ast?.astData.meter.phase}</span>
						</p>
						<p>
							Meter Type - <span>{ast?.astData.meter.type}</span>
						</p>
						<p>
							Meter Manufacture - <span>{ast?.astData.meter.manufacturer}</span>
						</p>
						<p>
							Meter Code - <span>{ast?.astData.meter.code}</span>
						</p>
					</div>

					<div className="data">
						<p className="data-header">Contact Person</p>
						<p></p>
						<p>
							Surname : <span>{trn.erfData.customer.contactPerson.surname}</span>
						</p>
						<p>
							Name : <span>{trn.erfData.customer.contactPerson.name}</span>
						</p>
						<p>
							CellNo : <span>{trn.erfData.customer.contactPerson.cellNo}</span>
						</p>
						<p>
							EmailAdr : <span>{trn.erfData.customer.contactPerson.emailAdr}</span>
						</p>
						<p>
							LandLine : <span>{trn.erfData.customer.contactPerson.landLine}</span>
						</p>
						<p>
							WhatsApp : <span>{trn.erfData.customer.contactPerson.whatsApp}</span>
						</p>
					</div>
					<div className="photos"></div>
				</div>
				<div className="row-2 ast-row">
					<div className="half-row-50-50">
						{/* <FormikControl
							control="select"
							type="text"
							label="disconnected level"
							name={`astData[${astCat}][${astCatIndex}].trnData.level`}
							placeholder="Disconnected Level"
							options={formSelectOptions.disconnectionLevelOptions}
						/> */}
						<FormikControl
							control="input"
							type="text"
							label="phase1 voltage"
							name={`astData[${astCat}][${astCatIndex}].trnData.readings.voltageReadings.phase1`}
							placeholder="Phase1 Reading"
						/>
						<FormikControl
							control="input"
							type="text"
							label="phase2 voltage"
							name={`astData[${astCat}][${astCatIndex}].trnData.readings.voltageReadings.phase2`}
							placeholder="Phase2 Reading"
						/>
					</div>
					<div className="half-row-50-50">
						<FormikControl
							control="input"
							type="text"
							label="phase3 voltage"
							name={`astData[${astCat}][${astCatIndex}].trnData.readings.voltageReadings.phase3`}
							placeholder="Phase3 Reading"
						/>
					</div>
				</div>
				<div className="row-3 ast-row">
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="meter sealed?"
							name={`astData[${astCat}][${astCatIndex}].trnData.seal.sealed`}
							placeholder="Meter sealed?"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="input"
							type="text"
							label="seal no"
							name={`astData[${astCat}][${astCatIndex}].trnData.seal.sealNo`}
							placeholder="seal no"
						/>
					</div>
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="meter has cb?"
							name={`astData[${astCat}][${astCatIndex}].trnData.cb.hasCb`}
							placeholder="Meter has cb?"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="input"
							type="text"
							label="cb size"
							name={`astData[${astCat}][${astCatIndex}].trnData.cb.size`}
							placeholder="cb size"
						/>
					</div>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default MeterReconnectionJsx;
