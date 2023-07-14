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
								control="input"
								type="text"
								label="cb size"
								name={`astData[${astCat}][${astCatIndex}].astData.cb.size`}
								placeholder="Cb Size"
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
						<div>
							<FormikControl
								control="input"
								type="text"
								label="linked meter no"
								name={`astData[${astCat}][${astCatIndex}].trnData.linkedMeter.meterNo`}
								placeholder="Lnked Meter No"
							/>
						</div>
					</div>
				</div>
			</FormSectionTrnAst>
		</div>
	);
};

export default CbAuditJsx;
