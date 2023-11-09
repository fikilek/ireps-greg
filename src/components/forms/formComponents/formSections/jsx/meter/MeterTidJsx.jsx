import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrnAst from "../../../formSection/FormSectionTrnAst";

const MeterTidJsx = props => {
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
							{/* access to keypad */}
							<FormikControl
								control="select"
								type="text"
								label="access to keypad"
								name={`astData[${astCat}][${astCatIndex}].trnData.accessToKeyPad`}
								placeholder="Access To KeyPad"
								options={formSelectOptions.yesNoOptions}
							/>
							<FormikControl
								control="mediaButton"
								type="button"
								label="keypad media"
								name={`astData[${astCat}][${astCatIndex}].astData.astMedia.keyPadMedia`}
								placeholder="KeyPad Media"
								ml1="asts"
							/>
						</div>
						<div className="half-row-50-50">
							<FormikControl
								control="select"
								type="text"
								label="TID rollover done?"
								name={`astData[${astCat}][${astCatIndex}].trnData.rolloverDone.done`}
								placeholder="Access To KeyPad"
								options={formSelectOptions.yesNoOptions}
							/>
							<FormikControl
								control="input"
								type="text"
								label="comments"
								name={`astData[${astCat}][${astCatIndex}].trnData.rolloverDone.comments`}
								placeholder="Comments"
								options={formSelectOptions.rolloverDoneCommentOptions}
							/>
						</div>
					</div>
					<div className="row-2 ast-row">
						<div className="half-row-50-50">
							{/* before TID rollover */}
							<FormikControl
								control="select"
								type="text"
								label="tariff before"
								name={`astData[${astCat}][${astCatIndex}].trnData.beforeTidRollover.status`}
								placeholder="tariff Before"
								options={formSelectOptions.tidRolloverStatusOptions}
							/>
							<FormikControl
								control="select"
								type="text"
								label="krn before"
								name={`astData[${astCat}][${astCatIndex}].trnData.beforeTidRollover.krn`}
								placeholder="KRN Before"
								options={formSelectOptions.tidRolloverKrnOptions}
							/>
						</div>
						<div className="half-row-50-50">
							{/* after TID rollover */}
							<FormikControl
								control="select"
								type="text"
								label="tariff after"
								name={`astData[${astCat}][${astCatIndex}].trnData.afterTidRollover.status`}
								placeholder="tariff after"
								options={formSelectOptions.tidRolloverStatusOptions}
							/>
							<FormikControl
								control="select"
								type="text"
								label="krn after"
								name={`astData[${astCat}][${astCatIndex}].trnData.afterTidRollover.krn`}
								placeholder="KRN After"
								options={formSelectOptions.tidRolloverKrnOptions}
							/>
						</div>
					</div>
					<div className="row-3 ast-row">
						{/* <div className="half-row-50-50"> */}
						{/* before TID rollover */}
						<FormikControl
							control="input"
							type="text"
							readOnly={true}
							label="ktc one"
							name={`astData[${astCat}][${astCatIndex}].astData.meterTokens.ktcOne`}
							placeholder="Ktc One"
						/>
						<FormikControl
							control="input"
							type="text"
							readOnly={true}
							label="ktc two"
							name={`astData[${astCat}][${astCatIndex}].astData.meterTokens.ktcTwo`}
							placeholder="Ktc Two"
						/>
						{/* </div> */}
					</div>
				</div>
			</FormSectionTrnAst>
		</div>
	);
};

export default MeterTidJsx;
