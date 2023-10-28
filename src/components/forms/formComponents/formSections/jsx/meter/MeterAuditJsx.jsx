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
								control="meterNo"
								type="text"
								label="Meter No"
								name={`astData[${astCat}][${astCatIndex}].astData.astNo`}
								placeholder="Meter No"
							/>
							<FormikControl
								control="mediaButton"
								type="button"
								label="Mn Media"
								name={`astData[${astCat}][${astCatIndex}].astData.astMedia.astNoMedia`}
								placeholder="Mn Media"
								ml1="asts"
							/>
						</div>
						<div className="half-row-50-50">
							<FormikControl
								control="select"
								type="text"
								label="Meter phase?"
								name={`astData[${astCat}][${astCatIndex}].astData.meter.phase`}
								placeholder="Meter Phase"
								options={formSelectOptions.meterPhaseOptions}
							/>
							<FormikControl
								control="select"
								type="text"
								label="Meter type?"
								name={`astData[${astCat}][${astCatIndex}].astData.meter.type`}
								placeholder="Meter Type"
								options={formSelectOptions.meterTypeOptions}
							/>
						</div>
					</div>
					<div className="row-2 ast-row">
						<div className="meter-adr">
							<FormikControl
								control="gcButton"
								type="button"
								label="click for meter address"
								name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.adr`}
								placeholder="Meter Address"
							/>
						</div>
						<div className="meter-gps">
							<div className="half-row-50-50">
								<FormikControl
									readOnly={true}
									control="input"
									type="text"
									label="gps(lat)"
									name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.gps.lat`}
									placeholder="Meter Gps"
								/>
								<FormikControl
									readOnly={true}
									control="input"
									type="text"
									label="gps(lng)"
									name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.gps.lng`}
									placeholder="Meter Gps"
								/>
							</div>
						</div>
					</div>
					<div className="row-3 ast-row">
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
								control="mediaButton"
								type="button"
								label="inside box media"
								name={`astData[${astCat}][${astCatIndex}].astData.astMedia.insideBoxMedia`}
								placeholder="Insie Box Media"
								ml1="asts"
							/>{" "}
							<FormikControl
								control="select"
								type="text"
								label="anomalies?"
								name={`astData[${astCat}][${astCatIndex}].trnData.anomalies`}
								placeholder="Anomalies"
								options={formSelectOptions.anomaliesOptions}
							/>
						</div>
					</div>
					<div className="row-4 ast-row">
						<div className="half-row-50-50">
							<FormikControl
								control="input"
								type="text"
								label="manufaturer"
								name={`astData[${astCat}][${astCatIndex}].astData.meter.manufacturer`}
								placeholder="Manufaturer"
							/>
							<FormikControl
								control="input"
								type="text"
								label="phase 1 voltage"
								name={`astData[${astCat}][${astCatIndex}].trnData.voltageReading.phase1`}
								placeholder="Volatage Phase 1"
							/>
						</div>
						<div className="half-row-50-50">
							<FormikControl
								control="input"
								type="text"
								label="phase 2 voltage"
								name={`astData[${astCat}][${astCatIndex}].trnData.voltageReading.phase2`}
								placeholder="Volatage Phase 2"
							/>
							<FormikControl
								control="input"
								type="text"
								label="phase 3 voltage"
								name={`astData[${astCat}][${astCatIndex}].trnData.voltageReading.phase3`}
								placeholder="Volatage Phase 3"
							/>
						</div>
					</div>
					<div className="row-5 ast-row">
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
								control="select"
								type="text"
								label="keypad access?"
								name={`astData[${astCat}][${astCatIndex}].trnData.keyPad.keyPadAccess`}
								placeholder="Keypad Access?"
								options={formSelectOptions.yesNoOptions}
							/>
						</div>
						<div className="half-row-50-50">
							<FormikControl
								control="mediaButton"
								type="button"
								label="keypad media"
								name={`astData[${astCat}][${astCatIndex}].astData.astMedia.keyPadMedia`}
								placeholder="Keypad Media"
								ml1="asts"
							/>
							<FormikControl
								control="select"
								type="text"
								label="no access reasons"
								name={`astData[${astCat}][${astCatIndex}].trnData.keyPad.noAccessReasons`}
								placeholder="No Access Reasons"
								options={formSelectOptions.keyPadNoAccessOptions}
							/>
							{/* TODO: hide the form control if the was access to keypad */}
						</div>
						{/* TODO: come back to include control for the installation group photos */}
					</div>
					<div className="row-6 ast-row">
						<div className="half-row-50-50">
							<FormikControl
								control="meterSealedSelect"
								type="text"
								label="meter sealed?"
								name={`astData[${astCat}][${astCatIndex}].trnData.meterSealed`}
								placeholder="Meter Sealed?"
								options={formSelectOptions.yesNoOptions}
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
