import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrnAst from "../../../formSection/FormSectionTrnAst";

const PoleAuditJsx = props => {
	const { ast, trn, astCat, astCatIndex } = props;

	return (
		<FormSectionTrnAst
			trn={trn}
			ast={ast}
			astCat={astCat}
			astCatIndex={astCatIndex}
		>
			<div className="ast">
				<div className="row-1 ast-row read-only-row">
					<FormikControl
						control="input"
						type="text"
						label="ast no"
						name={`astData[${astCat}][${astCatIndex}].astData.astNo`}
						placeholder="ast no"
					/>
					<FormikControl
						control="select"
						type="text"
						label="pole type"
						name={`astData[${astCat}][${astCatIndex}].astData.pole.type`}
						placeholder="pole type"
						options={formSelectOptions.poletypeOptions}
					/>
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
					{/* <div className="half-row-50-50">
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
					</div> */}
				</div>
				{/* <div className="row-4 ast-row">
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
				</div> */}
			</div>
		</FormSectionTrnAst>
	);
};

export default PoleAuditJsx;
