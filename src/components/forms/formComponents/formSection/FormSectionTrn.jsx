import cloneDeep from "lodash.clonedeep";
import React, { useContext, useState } from "react";
import { FormStateContext } from "../../../../contexts/FormStateContextProvider";
import FormikSelectConfirmInstallation from "../formik/FormikSelectConfirmInstallation";
import FormShowHideSection from "../formShowHideSection/FormShowHideSection";
import { formSelectOptions } from "../../../../utils/utils";

const FormSectionTrn = props => {
	// console.log(`props`, props);
	const { children, ast, astCatIndex, trn, usage, subSectionName } = props;
	// console.log(`ast`, ast);
	// console.log(`trn`, trn);

	// distructure trnType
	const { trnType } = trn.metaData;
	// console.log(`trnType`, trnType)

	const capTrnType = trnType.charAt(0).toUpperCase() + trnType.slice(1);
	// console.log(`capTrnType`, capTrnType)

	let astValidationVerdict = "";
	// create ast validation verdict state
	// const [astValidationVerdict, setAstValidationVerdict] = useState("");

	const { formState } = useContext(FormStateContext);
	// console.log(`formState`, formState);

	const clonedFormState = cloneDeep(formState);
	// console.log(`clonedFormState`, clonedFormState);

	delete clonedFormState.state;
	// console.log(`clonedFormState`, clonedFormState);

	const astArray = Object.entries(clonedFormState);
	// console.log(`astArray`, astArray)

	astArray &&
		astArray.forEach(astCat => {
			// console.log(`astCat[1]`, astCat[1])
			for (const key in astCat[1]) {
				// console.log(`key`, key)
				// console.log(`astCat[1][key]`, astCat[1][key])
				const astId = astCat[1][key]?.astTrackingInfo?.id;
				// console.log(`astId`, astId)
				if (astId === ast.id) {
					astValidationVerdict = astCat[1][key].verdict;
				}
			}
		});

	const [active, setActive] = useState(null);

	const { astCartegory: sectionName, astNo } = ast?.astData;
	// console.log(`sectionName`, sectionName);

	const catTypeStr = `${sectionName}${capTrnType}`;
	// console.log(`catTypeStr`, catTypeStr);

	return (
		// fs - form section
		// fsh - form section header
		// fsb - form section body
		// fs-uc - form section updated created
		<div className={`fs fs-${sectionName} `}>
			<div className={`fsh ${astValidationVerdict === "N/A" ? "grey-out" : ""} `}>
				<div className="fsh-sub fsh-left">
					<div className="open-colse-icons">
						<FormShowHideSection
							sectionName={sectionName}
							active={active}
							setActive={setActive}
						/>
					</div>
					<p>{astValidationVerdict}</p>
					<p>{astNo}</p>
					<div className="ast-cat">
						{usage
							? `${ast.astData?.astCartegory} ${subSectionName}`
							: ast.astData?.astCartegory}
					</div>
				</div>

				<div className="fsh-sub fsh-right">
					<div></div>
					<div>
						<span>Confirm {trnType}: </span>
						<FormikSelectConfirmInstallation
							control="select"
							type="text"
							label="confirm Installation"
							name={`astData[${sectionName}][${astCatIndex}].trnData.confirmations.confirmTrn`}
							// name={`astData[${sectionName}][${astCatIndex}].trnData.${sectionName}Installation.confirmations.confirmTrn`}
							options={formSelectOptions.trnConfirmationOptions}
						/>
					</div>
				</div>
			</div>
			<div
				className={`fsb ${
					active === sectionName ? "show-section" : "hide-section"
				}`}
			>
				{/* <FormSectionInvPop po={po} setPo={setPo} />
        <FormSectionSupplier po={po} setPo={setPo} /> */}
				{children}
			</div>
		</div>
	);
};

export default FormSectionTrn;
