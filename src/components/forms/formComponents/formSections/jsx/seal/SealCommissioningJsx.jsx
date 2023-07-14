import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const SealCommissioningJsx = props => {
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
								{
									trn.astData[astCat][astCatIndex]?.sealInstallation.linkedMeterNo
								}
							</span>
						</p>
					</div>
				</div>
				<div className="row-3 ast-row">
					<FormikControl
						control="select"
						type="text"
						label="seal no verfied"
						name={`astData[${astCat}][${astCatIndex}].trnData.sealNoVerified`}
						placeholder="Seal No Verified"
						options={formSelectOptions.yesNoOptions}
					/>
					<FormikControl
						control="select"
						type="text"
						label="seal meter link verfied"
						name={`astData[${astCat}][${astCatIndex}].trnData.sealMeterLinkVerified`}
						placeholder="Seal Meter Link Verified"
						options={formSelectOptions.yesNoOptions}
					/>
				</div>
				<div className="row-4 ast-row">
					<div className="exact-nearest-adr">
						<FormikControl
							control="select"
							type="text"
							label="seal locked?"
							name={`astData[${astCat}][${astCatIndex}].trnData.sealLocked`}
							placeholder="Seal Locked?"
							options={formSelectOptions.yesNoOptions}
						/>
					</div>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default SealCommissioningJsx;
