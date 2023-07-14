import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrnAst from "../../../formSection/FormSectionTrnAst";

const BoxAuditJsx = props => {
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
					<div className="row-2 ast-row">
						<FormikControl
							control="select"
							type="text"
							label="box exact location"
							name={`astData[${astCat}][${astCatIndex}].trnData.location.exactLocation`}
							placeholder="Exact Location"
							options={formSelectOptions.astExactLocationOptions}
						/>
						{/* premises and exact box location */}
						<FormikControl
							control="select"
							type="text"
							label="is box inside or outside premises"
							name={`astData[${astCat}][${astCatIndex}].trnData.location.premises`}
							placeholder="Where is Box Placed"
							options={formSelectOptions.astLocationPremisesOptions}
						/>
					</div>
					<div className="row-1 ast-row">
						{/* box address and gps */}
						<FormikControl
							control="input"
							type="text"
							label="exact/nearest box address"
							name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.adr`}
							placeholder="exact/nearest address"
						/>
						{/* TODO: figure out how to display gps */}

						<FormikControl
							readOnly={true}
							control="input"
							type="text"
							label="box lat"
							name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.gps.Latitude`}
							placeholder="Exact Gps Lat"
						/>
						<FormikControl
							readOnly={true}
							control="input"
							type="text"
							label="box lng"
							name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.gps.Longitude`}
							placeholder="Exact Gps Lng"
						/>
					</div>
					<div className="row-3 ast-row">
						<div className="half-row-50-50">
							<FormikControl
								control="select"
								type="text"
								label="box type"
								name={`astData[${astCat}][${astCatIndex}].astData.box.type`}
								placeholder="Box Type"
								options={formSelectOptions.boxTypeOptions}
							/>
							<FormikControl
								// readOnly={true}
								control="input"
								type="text"
								label="box no"
								name={`astData[${astCat}][${astCatIndex}].astData.astNo`}
								placeholder="Box No"
							/>
						</div>
						<div className="half-row-50-50">
							<FormikControl
								// readOnly={true}
								control="select"
								type="text"
								label="is box lockable?"
								name={`astData[${astCat}][${astCatIndex}].trnData.boxLock.lockable`}
								placeholder="Is Box Lockable?"
								options={formSelectOptions.yesNoOptions}
							/>
							<FormikControl
								control="select"
								type="text"
								label="is box locked?"
								name={`astData[${astCat}][${astCatIndex}].trnData.boxLock.isLocked`}
								placeholder="Is Box Locked?"
								options={formSelectOptions.yesNoOptions}
							/>
						</div>{" "}
					</div>
					<div className="row-4 sc-row">
						{/* service connection form- meter/cb/erfNo */}
						<FormikControl
							control="scFieldArray"
							type="text"
							name={`astData[${astCat}][${astCatIndex}].trnData.scns`}
							astCat={astCat}
							astCatIndex={astCatIndex}
						/>
					</div>
				</div>
			</FormSectionTrnAst>
		</div>
	);
};

export default BoxAuditJsx;
