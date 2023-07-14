import React from "react";
// import { formSelectOptions } from "../../../../../../utils/utils";
import FormikControl from "../../../formik/FormikControl";
import FormSectionTrn from "../../../formSection/FormSectionTrn";

const SealInstallation = props => {
	const { ast, trn, astCat, astCatIndex } = props;

	return (
		<FormSectionTrn ast={ast} trn={trn} astCat={astCat} astCatIndex={astCatIndex}>
			<div className="ast">
				<div className="row-1 ast-row read-only-row">
					<div className="data">
						<p className="data-header">Asset Data</p>
						<p>
							Asset No - <span>{ast?.astData.astNo}</span>
						</p>
						<p>
							Seal Code - <span>{ast?.astData.seal.code}</span>
						</p>
					</div>
					<div className="photos"></div>
				</div>
				<div className="row-2 ast-row">
					<FormikControl
						control="input"
						type="text"
						label="linked meter no?"
						name={`astData[${astCat}][${astCatIndex}].trnData.linkedMeterNo`}
						placeholder="Linked Meter No?"
					/>
				</div>
			</div>
		</FormSectionTrn>
	);
};

export default SealInstallation;
