import React from "react";
import {
	MdFormatListNumbered,
	MdHistory,
	MdLockClock,
	MdMyLocation,
	MdPerson,
	MdWebAsset,
} from "react-icons/md";
import { GiChoice } from "react-icons/gi";

const TrnFormMeterBilling = ({ handleChange }) => {
	return (
		<>
			{/* billing */}
			<div className={`fs trn-form-billing`}>
				<div className="fs-title">
					<p>Billing</p>
				</div>
				<div className="form-field trn-form-account-no">
					<span className="form-field-icon">
						<GiChoice />
					</span>
					<input
						type="text"
						name="accountNo"
						id="accountNo"
						// value={trnFormData.billing.accountNo}
						onChange={handleChange}
						placeholder="Account No"
					/>
				</div>
				<div className="form-field trn-form-indigent">
					<span className="form-field-icon">
						<GiChoice />
					</span>
					<input
						type="text"
						name="indigent"
						id="indigent"
						// value={trnFormData.billing.indigent}
						onChange={handleChange}
						placeholder="is indigent?"
					/>
				</div>
				<div className="form-field trn-form-tariff">
					<span className="form-field-icon">
						<GiChoice />
					</span>
					<input
						type="text"
						name="tariff"
						id="tariff"
						// value={trnFormData.billing.tariff}
						onChange={handleChange}
						placeholder="tariff?"
					/>
				</div>
			</div>
		</>
	);
};

export default TrnFormMeterBilling;
