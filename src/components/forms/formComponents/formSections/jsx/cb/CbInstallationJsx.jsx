import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const CbInstallation = props => {
	const { ast, trn, astCat, astCatIndex } = props;

	return (
		<FormSectionTrn trn={trn} ast={ast} astCat={astCat} astCatIndex={astCatIndex}>
			<div className="ast">
				<div className="row-1 ast-row read-only-row">
					<div className="data">
						<p className="data-header">Asset Data</p>
						<p>
							CB No - <span>{ast?.astData.astNo}</span>
						</p>
						<p>
							CB Size (Amps) - <span>{ast?.astData.cb.size}</span>
						</p>
						<p>
							CB Type (Sinlge/Double Pole) - <span>{ast?.astData.cb.type}</span>
						</p>
					</div>
					<div className="photos"></div>
				</div>
				<div className="row-2 ast-row">
					<FormikControl
						control="select"
						type="text"
						label="is cb inside or outside premises"
						name={`astData[${astCat}][${astCatIndex}].trnData.location.premises`}
						placeholder="Where is cb Placed"
						options={formSelectOptions.astLocationPremisesOptions}
					/>
					<FormikControl
						control="select"
						type="text"
						label="box exact location"
						name={`astData[${astCat}][${astCatIndex}].trnData.location.exactLocation`}
						placeholder="Exact Location"
						options={formSelectOptions.astExactLocationOptions}
					/>
				</div>
				<div className="row-3 ast-row">
					<FormikControl
						control="select"
						type="text"
						label="is cb inside box?"
						name={`astData[${astCat}][${astCatIndex}].trnData.location.insideBox`}
						placeholder="Inside Box?"
						options={formSelectOptions.yesNoOptions}
					/>
					<div className="half-row">
						<FormikControl
							control="select"
							type="text"
							label="linked meter?"
							name={`astData[${astCat}][${astCatIndex}].trnData.linkedMeter.isLinkedToMeter`}
							placeholder="Is Linked To Meter?"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="input"
							type="text"
							label="linked meter no"
							name={`astData[${astCat}][${astCatIndex}].trnData.linkedMeter.meterNo`}
							placeholder="Meter No"
						/>
					</div>
				</div>

				<div className="row-4 ast-row">
					<div>
						<FormikControl
							control="input"
							type="text"
							label="exact/nearest cb address"
							name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.adr`}
							placeholder="exact/nearest address"
						/>
					</div>
					<div className="half-row-50-50">
						<FormikControl
							readOnly={"true"}
							control="input"
							type="text"
							label="gps lat"
							name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.gps.lat`}
							placeholder="Exact Gps Lat"
						/>
						<FormikControl
							readOnly={"true"}
							control="input"
							type="text"
							label="gps lng"
							name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.gps.lng`}
							placeholder="Exact Gps Lng"
						/>
					</div>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default CbInstallation;
