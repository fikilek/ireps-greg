import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const PoleInspectionJsx = props => {
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
							Pole length - <span>{ast?.astData.pole.length}</span>
						</p>
						<p>
							Pole Type - <span>{ast?.astData.pole.type}</span>
						</p>
					</div>

					<div className="data">
						<p className="data-header">Installation Data</p>
						<p>
							Location - premises
							<span>
								{trn.astData[astCat][astCatIndex].poleInstallation.location.premises}
							</span>
						</p>
						<p>
							Asset physical address -
							<span>
								{trn.astData[astCat][astCatIndex].poleInstallation.astAdr.adr}
							</span>
						</p>
						<p>
							Asset address gps -
							<span>
								{trn.astData[astCat][astCatIndex].poleInstallation.astAdr.gps}
							</span>
						</p>
					</div>
					{/* <div className="photos"></div> */}
				</div>
				<div className="row-2 ast-row">
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="pole leaning?"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleLeaning`}
							placeholder="pole leaning?"
							options={formSelectOptions.yesNoOptions}
						/>
						<FormikControl
							control="select"
							type="text"
							label="pole intact?"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleIntact`}
							placeholder="pole intact?"
							options={formSelectOptions.yesNoOptions}
						/>
					</div>
					<div className="half-row-50-50">
						<FormikControl
							control="select"
							type="text"
							label="pole damaged?"
							name={`astData[${astCat}][${astCatIndex}].trnData.poleDamaged`}
							placeholder="pole damaged?"
							options={formSelectOptions.yesNoOptions}
						/>
					</div>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default PoleInspectionJsx;
