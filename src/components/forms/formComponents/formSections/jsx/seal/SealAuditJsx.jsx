import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrnAst from "../../../formSection/FormSectionTrnAst";

const SealAuditJsx = props => {
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
								control="select"
								type="text"
								label="meter sealed?"
								name={`astData[${astCat}][${astCatIndex}].trnData.meterSealed`}
								placeholder="Meter Sealed?"
								options={formSelectOptions.yesNoOptions}
							/>
							<FormikControl
								control="input"
								type="text"
								label="seal no"
								name={`astData[${astCat}][${astCatIndex}].astData.astNo`}
								placeholder="Seal No"
							/>
						</div>
						<div className="half-row-50-50">
							<FormikControl
								control="mediaButton"
								type="button"
								label="seal no media"
								name={`astData[${astCat}][${astCatIndex}].astData.astMedia.astNoMedia`}
								placeholder="Seal No Media"
								ml1="asts"
							/>
							<FormikControl
								control="input"
								type="text"
								label="linked meter no"
								name={`astData[${astCat}][${astCatIndex}].trnData.linkedMeterNo`}
								placeholder="Linked Meter No"
							/>
						</div>
					</div>
					<div className="row-1 ast-row">
						{/* <div className="half-row-50-50"> */}
						<FormikControl
							control="select"
							type="text"
							label="seal comments"
							name={`astData[${astCat}][${astCatIndex}].trnData.sealComments`}
							placeholder="Meter Phase"
							options={formSelectOptions.sealCommentsOptions}
						/>
						{/* </div> */}
					</div>
				</div>
			</FormSectionTrnAst>
		</div>
	);
};

export default SealAuditJsx;
