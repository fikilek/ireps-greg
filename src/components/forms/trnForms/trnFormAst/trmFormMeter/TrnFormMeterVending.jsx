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

const TrnFormMeterVending = (formState, setFormState) => {
	return (
		<>
			{/* meter vending */}
			<div>
				<div className="fs-title">
					<p>Vending</p>
				</div>
				<div className="form-field trn-form-datetime">
					<span className="form-field-icon">
						<GiChoice />
					</span>
					<input
						type="datetime-local"
						name="vending-datetime"
						id="vending-datetime"
						// value={trnFormData.asr.datetime}
						onChange={setFormState}
						placeholder="Vending date / time"
					/>
				</div>
				<div className="form-field trn-form-amount">
					<span className="form-field-icon">
						<GiChoice />
					</span>
					<input
						type="datetime-local"
						name="vending-amount"
						id="vending-amount"
						// value={trnFormData.asr.amount}
						onChange={setFormState}
						placeholder="Vending amount"
					/>
				</div>
			</div>
		</>
	);
};

export default TrnFormMeterVending;
