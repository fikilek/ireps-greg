import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const CbInspectionJsx = props => {
	const { ast, trn, astCat, astCatIndex } = props;

	return (
		<FormSectionTrn
			trn={trn}
			ast={ast}
			astCatIndex={astCatIndex}
			// active={active}
			// setActive={setActive}
		>
			<div className="ast">
				<div className="row-1 ast-row read-only-row">
					<div className="data">
						<p className="data-header">Asset Data</p>
						{/* TODO: make this to be a reusable component */}
						<p>
							Asset ({ast.astData.astCartegory}) No - <span>{ast?.astData.astNo}</span>
						</p>
						<p>
							CB Size (Amps) - <span>{ast?.astData.cb.cbSize}</span>
						</p>
						<p>
							CB Searial No - <span>{ast?.astData.astSerialNo}</span>
						</p>
						<p>
							{/* TODO: introduce cb pole on the astData */}
							CB Type (Sinlge/Double Pole) - <span>{ast?.astData.cb.type}</span>
						</p>
					</div>

					<div className="data">
						<p className="data-header">Installation Data</p>
						{/* TODO: make this to be a reusable component */}
						<p>
							CB Location - premises:
							<span>
								{trn.astData[astCat][astCatIndex].cbInstallation.location.premises}
							</span>
						</p>
						<p>
							CB Location - insideBox:
							<span>
								{trn.astData[astCat][astCatIndex].cbInstallation.location.insideBox}
							</span>
						</p>
						<p>
							CB Location - exactLocation:
							<span>
								{trn.astData[astCat][astCatIndex].cbInstallation.location.exactLocation}
							</span>
						</p>
						<p>
							CB Physical Address :
							<span>{trn.astData[astCat][astCatIndex].cbInstallation.astAdr.adr}</span>
						</p>
						<p>
							CB gps location :
							<span>{trn.astData[astCat][astCatIndex].cbInstallation.astAdr.gps.lat}</span>{" / "}
							<span>{trn.astData[astCat][astCatIndex].cbInstallation.astAdr.gps.lng}</span>
						</p>
						<p>
							CB Physical Address :
							<span>{trn.astData[astCat][astCatIndex].cbInstallation.astAdr.adr}</span>
						</p>
						<p>
							CB linked to a meter? :
							<span>
								{
									trn.astData[astCat][astCatIndex].cbInstallation.linkedMeter
										.isLinkedToMeter
								}
							</span>
						</p>
						<p>
							CB meter? :
							<span>
								{trn.astData[astCat][astCatIndex].cbInstallation.linkedMeter.meterNo}
							</span>
						</p>
					</div>
				</div>
				<div className="row-2 ast-row">
					<div className="halr-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="cb present?"
							name={`astData[${astCat}][${astCatIndex}].trnData.cbPresent`}
							placeholder="Cb Present?"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="select"
							type="text"
							label="any visible damage?"
							name={`astData[${astCat}][${astCatIndex}].trnData.visibleDamage`}
							placeholder="any visible damage?"
							options={formSelectOptions.yesNoOptions}
						/>
					</div>
					<FormikControl
						control="select"
						type="text"
						label="same circuit as meter?"
						name={`astData[${astCat}][${astCatIndex}].trnData.sameCircuitAsMeter`}
						placeholder="same circuit as meter?"
						options={formSelectOptions.yesNoOptions}
					/>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default CbInspectionJsx;
