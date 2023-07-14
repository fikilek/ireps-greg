import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const BoxInstallationJsx = props => {
	const { ast, trn, astCat, astCatIndex, trnType } = props;

	return (
		<FormSectionTrn
			trn={trn}
			ast={ast}
			astCat={astCat}
			astCatIndex={astCatIndex}
			trnType={trnType}
		>
			<div className="ast">
				<div className="row-1 ast-row read-only-row">
					<div className="data">
						<p className="data-header">Asset Data</p>
						<p>
							Box No - <span>{ast?.astData.astNo}</span>
						</p>
						<p>
							Box Type - <span>{ast?.astData.box.type}</span>
						</p>
						<p>
							Box Color - <span>{ast?.astData.box.color}</span>
						</p>
						<p>
							Box Dimensions -<span>H:{ast?.astData.box.dimensions.height}</span>
							{` : `}
							<span>W:{ast?.astData.box.dimensions.width}</span>
							{` : `}
							<span>L:{ast?.astData.box.dimensions.length}</span>
							{` : `}
						</p>
					</div>
					<div className="photos"></div>
				</div>
				<div className="row-1 ast-row">
					{/* premises and exact box location */}
					<FormikControl
						control="select"
						type="text"
						label="is box inside or outside premises"
						name={`astData[${astCat}][${astCatIndex}].trnData.location.premises`}
						placeholder="Where is Box Placed"
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
				<div className="row-2 ast-row">
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
						// readOnly={true}
						control="input"
						type="text"
						label="box lat/lon"
						name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.gps`}
						placeholder="Exact Gps"
					/>
				</div>
				<div className="row-3 ast-row">
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
		</FormSectionTrn>
	);
};

export default BoxInstallationJsx;
