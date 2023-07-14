import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const PoleInstallationJsx = props => {
  const { ast, trn, astCat, astCatIndex } = props;
  
	return (
		<FormSectionTrn trn={trn} ast={ast} astCat={astCat} astCatIndex={astCatIndex}>
			<div className="ast">
				<div className="row-1 ast-row read-only-row">
					<div className="data">
						<p className="data-header">Asset Data</p>
						<p>
							Asset No - <span>{ast?.astData.astNo}</span>
						</p>
						<p>
							Pole Length - <span>{ast?.astData.pole.length}</span>
						</p>
						<p>
							Pole Type - <span>{ast?.astData.pole.type}</span>
						</p>
					</div>
					<div className="photos"></div>
				</div>
				<div className="row-2 ast-row">
					<FormikControl
						control="input"
						type="text"
						label="Pole Address"
						name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.adr`}
						placeholder="Pole Address"
					/>
					{/* TODO: figure out how to display gps. THis will be stored as a string in firestore so it will be dispalyed on ui as a gps string */}
					<FormikControl
						// readOnly={true}
						control="input"
						type="text"
						label="pole lat/lon"
						name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.gps`}
						placeholder="Exact Gps"
					/>
				</div>
				<div className="row-3 ast-row">
					{/* premises and exact box location */}
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="premises"
							name={`astData[${astCat}][${astCatIndex}].trnData.location.premises`}
							placeholder="premises"
							options={formSelectOptions.astLocationPremisesOptions}
						/>
					</div>
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="pole leaning?"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleCondition.leaning`}
							placeholder="Pole Leaning"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="select"
							type="text"
							label="pole health"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleCondition.health`}
							placeholder="Pole Health"
							options={formSelectOptions.goodBadOptions}
						/>
					</div>
				</div>
				<div className="row-4 ast-row">
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="lamp attached?"
							name={`astData[${astCat}][${astCatIndex}].trnData.streetLamp.hasAttachedLamp`}
							placeholder="lamp attached?"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="input"
							type="text"
							label="lamp no?"
							name={`astData[${astCat}][${astCatIndex}].trnData.streetLamp.lampNo`}
							placeholder="lamp no"
						/>
					</div>
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="box attached?"
							name={`astData[${astCat}][${astCatIndex}].trnData.box.hasAttacheBox`}
							placeholder="box attached?"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="input"
							type="text"
							label="box no?"
							name={`astData[${astCat}][${astCatIndex}].trnData.box.boxNo`}
							placeholder="box no"
						/>
					</div>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default PoleInstallationJsx;
