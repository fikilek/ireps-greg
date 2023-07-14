import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const MeterCommissioningJsx = props => {
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
							{"  |  "}
							<span>
								{trn.astData[astCat][astCatIndex].meterInstallation.astAdr.gps}
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
					<FormikControl
						control="input"
						type="text"
						label="voltage reading"
						name={`astData[${astCat}][${astCatIndex}].trnData.voltageReading`}
						placeholder="Voltage Reading"
					/>
					<FormikControl
						control="input"
						type="text"
						name={`astData[${astCat}][${astCatIndex}].trnData.meterReading`}
						label="meter reading"
						placeholder="Meter Reading"
					/>
				</div>
				<div className="row-4 ast-row">
					<FormikControl
						control="select"
						type="text"
						label="confirm installation data"
						name={`astData[${astCat}][${astCatIndex}].trnData.confirmInstallationData`}
						placeholder="Seal Locked?"
						options={formSelectOptions.confirmInstallationDataOptions}
					/>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default MeterCommissioningJsx;
