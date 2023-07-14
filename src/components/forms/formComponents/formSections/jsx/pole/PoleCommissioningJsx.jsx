import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const PoleCommissioningJsx = props => {
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
								{
									trn.astData[astCat][astCatIndex].poleInstallation.location
										.premises
								}
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
					<FormikControl
						control="select"
						type="text"
						label="installation data verified?"
						name={`astData[${astCat}][${astCatIndex}].trnData.installationDataVerified`}
						placeholder="installation data verified?"
						options={formSelectOptions.yesNoOptions}
					/>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default PoleCommissioningJsx;
