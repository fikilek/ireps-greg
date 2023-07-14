import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const SealInspectionJsx = props => {
	const { ast, trn, astCat, astCatIndex, trnType } = props;

	return (
		<FormSectionTrn
			trn={trn}
			ast={ast}
			astCatIndex={astCatIndex}
			trnType={trnType}
		>
			<div className="ast">
				<div className="row-1 ast-row read-only-row">
					<div className="data">
						<p className="data-header">Asset Data</p>
						<p>
							Seal No - <span>{ast?.astData.astNo}</span>
						</p>
						<p>
							Seal Code - <span>{ast?.astData.seal.code}</span>
						</p>
					</div>

					<div className="data">
						<p className="data-header">Installation Data</p>
						<p>
							Linked Meter No -{" "}
							<span>
								{trn.astData[astCat][astCatIndex]?.sealInstallation.linkedMeterNo}
							</span>
						</p>
					</div>
				</div>
				<div className="row-2 ast-row">
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="is seal intact?"
							name={`astData[${astCat}][${astCatIndex}].trnData.sealIntactOnMeter`}
							placeholder="Seal Intact?"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="select"
							type="text"
							label="is seal cut?"
							name={`astData[${astCat}][${astCatIndex}].trnData.sealCut`}
							placeholder="Seal Mcut?"
							options={formSelectOptions.yesNoOptions}
						/>
					</div>
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="is seal removed?"
							name={`astData[${astCat}][${astCatIndex}].trnData.sealRemoved`}
							placeholder="Seal removed?"
							options={formSelectOptions.yesNoOptions}
						/>
					</div>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default SealInspectionJsx;
