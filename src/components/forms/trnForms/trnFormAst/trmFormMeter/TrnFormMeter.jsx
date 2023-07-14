import React, { useState } from "react";
import TrnFormMeterCustomerAdr from "./TrnFormMeterCustomerAdr";
import TrnFormMeterBilling from "./TrnFormMeterBilling";
import TrnFormMeterMetaData from "./TrnFormMeterMetaData";
import TrnFormMeterCustomer from "./TrnFormMeterCustomer";
import "./trnFormMeter.css";
import useTrnFormMeter from "./useTrnFormMeter";
import TrnFormMeterMeterData from "./TrnFormMeterMeterData";
import TrnFormMeterAsr from "./TrnFormMeterAsr";
import TrnFormMeterActionTaken from "./TrnFormMeterActionTaken";
import TrnFormMeterVending from "./TrnFormMeterVending";
import TrnFormMeterComissioning from "./TrnFormMeterComissioning";
import TrnFormMeterDecomissioning from "./TrnFormMeterDecomissioning";

const TrnFormMeter = ({ trnType }) => {
	console.log(`trnType`, trnType);

	const [formState, setFormState] = useState({});

	const formSectionsTrnMeter = useTrnFormMeter();
	console.log(`formSectionsTrnMeter`, formSectionsTrnMeter);
	const formSections = formSectionsTrnMeter.formSectionsTrnMeter[trnType];

	console.log(`formSections`, formSections);

	const handleSubmit = e => {
		e.preventDafault();
	};

	return (
		<div className="trn-form-body ireps-form-body">
			<form className={`ireps-form trn-form`} onSubmit={handleSubmit}>
				<>
					{formSections.metaData ? (
						<TrnFormMeterMetaData formSate={formState} setFormState={setFormState} />
					) : (
						<></>
					)}
				</>
				<>
					{formSections.customerAdr ? (
						<TrnFormMeterCustomerAdr
							formSate={formState}
							setFormState={setFormState}
						/>
					) : (
						<></>
					)}
				</>
				<>
					{formSections.billing ? (
						<TrnFormMeterBilling formSate={formState} setFormState={setFormState} />
					) : (
						<></>
					)}
				</>
				<>
					{formSections.customer ? (
						<TrnFormMeterCustomer formSate={formState} setFormState={setFormState} />
					) : (
						<></>
					)}
				</>
				<>
					{formSections.meterData ? (
						<TrnFormMeterMeterData formSate={formState} setFormState={setFormState} />
					) : (
						<></>
					)}
				</>
				<>
					{formSections.asr ? (
						<TrnFormMeterAsr formSate={formState} setFormState={setFormState} />
					) : (
						<></>
					)}
				</>
				<>
					{formSections.actionTaken ? (
						<TrnFormMeterActionTaken
							formSate={formState}
							setFormState={setFormState}
						/>
					) : (
						<></>
					)}
				</>
				<>
					{formSections.vending ? (
						<TrnFormMeterVending formSate={formState} setFormState={setFormState} />
					) : (
						<></>
					)}
				</>
				<>
					{formSections.commissioning ? (
						<TrnFormMeterComissioning
							formSate={formState}
							setFormState={setFormState}
						/>
					) : (
						<></>
					)}
				</>
				<>
					{formSections.deomissioning ? (
						<TrnFormMeterDecomissioning
							formSate={formState}
							setFormState={setFormState}
						/>
					) : (
						<></>
					)}
				</>

				<div className="form-btns">
					<button
						className="form-btn Clear"
						// onClick={e => setUserCredentials(initSigninData)}
					>
						Clear
					</button>
					<button
						className="form-btn reset"
						// onClick={e => setUserCredentials(initSigninData)}
					>
						Reset
					</button>
					<button className="form-btn submit">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default TrnFormMeter;
