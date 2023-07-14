import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const MeterInspectionJsx = props => {
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
						<p className="data-header">Installation Data</p>
						<p>
							Location - premises :
							<span>
								{trn.astData[astCat][astCatIndex].meterInstallation.location.premises}
							</span>
						</p>
						<p>
							Location - inside box? :
							<span>
								{trn.astData[astCat][astCatIndex].meterInstallation.location.insideBox}
							</span>
						</p>
						<p>
							Location - exact location :
							<span>
								{
									trn.astData[astCat][astCatIndex].meterInstallation.location
										.exactLocation
								}
							</span>
						</p>
						<p>
							Service Connection :
							<span>
								{trn.astData[astCat][astCatIndex].meterInstallation.connection}
							</span>
						</p>
						<p>
							Is there a Key Pad? :
							<span>
								{trn.astData[astCat][astCatIndex].meterInstallation.isThereKeyPad}
							</span>
						</p>
						<p>
							Kye Pad Serial no :
							<span>
								{trn.astData[astCat][astCatIndex].meterInstallation.serialNo}
							</span>
						</p>
						<p>
							Kep Pad Address & Gps :
							<span>
								{trn.astData[astCat][astCatIndex].meterInstallation.astAdr.adr}
							</span>{" "}
							<span>
								{trn.astData[astCat][astCatIndex].meterInstallation.astAdr.gps.lat}{" / "}
								{trn.astData[astCat][astCatIndex].meterInstallation.astAdr.gps.lng}
							</span>
						</p>
						<p>
							Voltage Reading :
							<span>
								{
									trn.astData[astCat][astCatIndex].meterInstallation.voltageReading
										.phase1
								}
							</span>
							{"  | "}
							<span>
								{
									trn.astData[astCat][astCatIndex].meterInstallation.voltageReading
										.phase2
								}
							</span>
							{"  | "}
							<span>
								{
									trn.astData[astCat][astCatIndex].meterInstallation.voltageReading
										.phase3
								}
							</span>
						</p>
						<p>
							Linked Cb? :
							<span>
								{trn.astData[astCat][astCatIndex].meterInstallation.linkedCb.isThereCb}
							</span>
							{"  | "}
							<span>
								{trn.astData[astCat][astCatIndex].meterInstallation.linkedCb.cbSize}
							</span>
						</p>
						<p>
							Linked Seal? :
							<span>
								{
									trn.astData[astCat][astCatIndex].meterInstallation.linkedSeal
										.isThereSeal
								}
							</span>
							{"  | "}
							<span>
								{trn.astData[astCat][astCatIndex].meterInstallation.linkedSeal.sealSize}
							</span>
						</p>
					</div>
					<div className="photos"></div>
				</div>
				<div className="row-2 ast-row">
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="meter present?"
							name={`astData[${astCat}][${astCatIndex}].trnData.meterPresent`}
							placeholder="Meter Present?"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="select"
							type="text"
							label="meter tempered?"
							name={`astData[${astCat}][${astCatIndex}].trnData.meterTempered`}
							placeholder="Meter Tempered?"
							options={formSelectOptions.yesNoOptions}
						/>
					</div>
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="meter in use?"
							name={`astData[${astCat}][${astCatIndex}].trnData.meterInUse`}
							placeholder="Meter in use?"
							options={formSelectOptions.yesNoOptions}
						/>
					</div>
				</div>
				<div className="row-3 ast-row">
					<div className="half-row-50-50">
						<FormikControl
							control="input"
							type="text"
							label="meter reading"
							name={`astData[${astCat}][${astCatIndex}].trnData.readings.meterReading`}
							placeholder="Meter reading?"
						/>
						<FormikControl
							control="input"
							type="text"
							label="phase 1"
							name={`astData[${astCat}][${astCatIndex}].trnData.readings.voltageReadings.phase1`}
							placeholder="phase 1"
						/>
					</div>
					<div className="half-row-50-50">
						<FormikControl
							control="input"
							type="text"
							label="phase 2"
							name={`astData[${astCat}][${astCatIndex}].trnData.readings.voltageReadings.phase2`}
							placeholder="phase 2"
						/>
						<FormikControl
							control="input"
							type="text"
							label="phase 3"
							name={`astData[${astCat}][${astCatIndex}].trnData.readings.voltageReadings.phase3`}
							placeholder="phase 3"
						/>
					</div>
				</div>
				<div className="row-4 ast-row">
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
				<div className="row-5 ast-row">
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="meter location"
							name={`astData[${astCat}][${astCatIndex}].trnData.location.premises`}
							placeholder="Meter location"
							options={formSelectOptions.astLocationPremisesOptions}
						/>
						<FormikControl
							control="select"
							type="text"
							label="inside box"
							name={`astData[${astCat}][${astCatIndex}].trnData.location.insideBox`}
							placeholder="inside box"
							options={formSelectOptions.astLocationPremisesOptions}
						/>
					</div>
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="on pole"
							name={`astData[${astCat}][${astCatIndex}].trnData.location.onPole`}
							placeholder="on pole"
							options={formSelectOptions.astLocationPremisesOptions}
						/>
					</div>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default MeterInspectionJsx;
