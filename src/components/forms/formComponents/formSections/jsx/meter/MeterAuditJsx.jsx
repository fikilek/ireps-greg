import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrnAst from "../../../formSection/FormSectionTrnAst";

const MeterAuditJsx = props => {
	const { ast, trn, astCat, astCatIndex } = props;

	return (
		<div>
			<FormSectionTrnAst
				trn={trn}
				ast={ast}
				astCat={astCat}
				astCatIndex={astCatIndex}
			>
				<div className="ast">
					<div className="row-1 ast-row">
						<div className="half-row-50-50">
							<FormikControl
								control="input"
								type="text"
								label="Meter No?"
								name={`astData[${astCat}][${astCatIndex}].astData.astNo`}
								placeholder="Meter No"
							/>
							<FormikControl
								control="select"
								type="text"
								label="Meter phase?"
								name={`astData[${astCat}][${astCatIndex}].astData.meter.phase`}
								placeholder="Meter Phase"
								options={formSelectOptions.meterPhaseOptions}
							/>
						</div>
						<div className="half-row-50-50">
							<FormikControl
								control="select"
								type="text"
								label="Meter type?"
								name={`astData[${astCat}][${astCatIndex}].astData.meter.type`}
								placeholder="Meter Type"
								options={formSelectOptions.meterTypeOptions}
							/>
							<FormikControl
								control="input"
								type="text"
								label="manufaturer?"
								name={`astData[${astCat}][${astCatIndex}].astData.meter.manufaturer`}
								placeholder="Manufaturer"
							/>
						</div>
					</div>
					<div className="row-1 ast-row">
						<div className="meter-adr">
							<FormikControl
								control="input"
								type="text"
								label="meter address"
								name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.adr`}
								placeholder="Meter Adr"
							/>
						</div>
						<div className="meter-gps">
							<FormikControl
								// readOnly={true}
								control="input"
								type="text"
								label="meter gps(lat/lon)"
								name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.gps`}
								placeholder="Meter Gps"
							/>
						</div>
					</div>
					<div className="row-2 ast-row">
						<div className="half-row-50-50">
							<FormikControl
								control="select"
								type="text"
								label="premises?"
								name={`astData[${astCat}][${astCatIndex}].trnData.location.premises`}
								placeholder="Premises"
								options={formSelectOptions.astLocationPremisesOptions}
							/>
							<FormikControl
								control="select"
								type="text"
								label="inside box?"
								name={`astData[${astCat}][${astCatIndex}].trnData.location.insideBox`}
								placeholder="Inside Box"
								options={formSelectOptions.yesNoOptions}
							/>
						</div>
						<div className="half-row-50-50">
							<FormikControl
								control="select"
								type="text"
								label="exact location?"
								name={`astData[${astCat}][${astCatIndex}].trnData.location.exactLocation`}
								placeholder="Exact Location"
								options={formSelectOptions.astExactLocationOptions}
							/>
							<FormikControl
								control="select"
								type="text"
								label="service connection?"
								name={`astData[${astCat}][${astCatIndex}].trnData.serviceConnection.connection`}
								placeholder="Service Connection"
								options={formSelectOptions.serviceConnectionEntryOptions}
							/>
						</div>
					</div>
					<div className="row-3 ast-row">
						<div className="half-row-50-50">
							<FormikControl
								control="input"
								type="text"
								label="phase 1"
								name={`astData[${astCat}][${astCatIndex}].trnData.voltageReading.phase1`}
								placeholder="Volatage Phase 1"
							/>
							<FormikControl
								control="input"
								type="text"
								label="phase 2"
								name={`astData[${astCat}][${astCatIndex}].trnData.voltageReading.phase2`}
								placeholder="Volatage Phase 2"
							/>
						</div>
						<div className="half-row-50-50">
							<FormikControl
								control="input"
								type="text"
								label="phase 3"
								name={`astData[${astCat}][${astCatIndex}].trnData.voltageReading.phase3`}
								placeholder="Volatage Phase 3"
							/>
							<FormikControl
								control="input"
								type="text"
								label="photos"
								name={`astData[${astCat}][${astCatIndex}].trnData.voltageReading.photos`}
								placeholder="Volatage Photos"
							/>
						</div>
					</div>
					<div className="row-4 ast-row">
						<div className="half-row-50-50">
							<FormikControl
								control="select"
								type="text"
								label="is there keypad?"
								name={`astData[${astCat}][${astCatIndex}].trnData.keyPad.isThereKeyPad`}
								placeholder="Is There Keypad?"
								options={formSelectOptions.yesNoOptions}
							/>
							<FormikControl
								control="input"
								type="text"
								label="keypad serial no"
								name={`astData[${astCat}][${astCatIndex}].trnData.keyPad.serialNo`}
								placeholder="Keypad Serial No"
							/>
						</div>
						<div>
							<FormikControl
								control="input"
								type="text"
								label="keypad photos"
								name={`astData[${astCat}][${astCatIndex}].trnData.keyPad.photos`}
								placeholder="Keypad Photos"
							/>
						</div>
						{/* TODO: come back to include control for the installation group photos */}
					</div>
					<div className="row-5 ast-row">
						<div className="half-row-50-50">
							<FormikControl
								control="select"
								type="text"
								label="is there cb?"
								name={`astData[${astCat}][${astCatIndex}].trnData.linkedCb.isThereCb`}
								placeholder="Is There Cb?"
								options={formSelectOptions.yesNoOptions}
							/>
							<FormikControl
								control="input"
								type="text"
								label="cb size"
								name={`astData[${astCat}][${astCatIndex}].trnData.linkedCb.cbSize`}
								placeholder="Cb Size"
							/>
						</div>
						<div className="half-row-50-50">
							<FormikControl
								control="select"
								type="text"
								label="is there seal?"
								name={`astData[${astCat}][${astCatIndex}].trnData.linkedSeal.isThereSeal`}
								placeholder="Is There Cb?"
								options={formSelectOptions.yesNoOptions}
							/>
							<FormikControl
								control="input"
								type="text"
								label="seal size"
								name={`astData[${astCat}][${astCatIndex}].trnData.linkedSeal.sealSize`}
								placeholder="Seal Size"
							/>
						</div>
						{/* TODO: come back to include control for the installation group photos */}
					</div>
				</div>
			</FormSectionTrnAst>
		</div>
	);
};

export default MeterAuditJsx;
