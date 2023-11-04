import React from "react";
import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrnAst from "../../../formSection/FormSectionTrnAst";

const CbAuditJsx = props => {
	const { ast, trn, astCat, astCatIndex } = props;

	return (
		<div>
			{" "}
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
								control="inputNumberOnly"
								type="number"
								label="cb size"
								name={`astData[${astCat}][${astCatIndex}].astData.cb.size`}
								placeholder="Cb Size"
							/>
							<FormikControl
								control="mediaButton"
								type="button"
								label="cb size media"
								name={`astData[${astCat}][${astCatIndex}].astData.astMedia.sizeMedia`}
								placeholder="Cb Size Media"
								ml1="asts"
							/>
						</div>
						<div>
							<div className="half-row-50-50">
								<FormikControl
									control="input"
									type="text"
									label="linked meter no"
									name={`astData[${astCat}][${astCatIndex}].trnData.linkedMeter.meterNo`}
									placeholder="Lnked Meter No"
								/>
								<FormikControl
									control="select"
									type="text"
									label="single/double pole"
									name={`astData[${astCat}][${astCatIndex}].astData.cb.type`}
									placeholder="Cb Type"
									options={formSelectOptions.cbPoleOtions}
								/>
							</div>
						</div>
					</div>
					<div className="row-2 ast-row">
						<div className="cb-adr">
							<FormikControl
								control="gcButton"
								type="button"
								label="click for cb address"
								name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.adr`}
								placeholder="Cb Address"
							/>
						</div>
						<div className="meter-gps">
							<div className="half-row-50-50">
								<FormikControl
									readOnly={true}
									control="input"
									type="text"
									label="gps(lat)"
									name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.gps.lat`}
									placeholder="CB Gps"
								/>
								<FormikControl
									readOnly={true}
									control="input"
									type="text"
									label="gps(lng)"
									name={`astData[${astCat}][${astCatIndex}].trnData.astAdr.gps.lng`}
									placeholder="CB Gps"
								/>
							</div>
						</div>
					</div>
				</div>
			</FormSectionTrnAst>
		</div>
	);
};

export default CbAuditJsx;
