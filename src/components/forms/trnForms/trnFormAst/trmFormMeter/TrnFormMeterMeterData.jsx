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

const TrnFormMeterMeterData = (formState, setFormState) => {
	return (
		<>
			{/* asset */}
			<div className={`fs trn-form-asset`}>
				<div className="fs-title">
					<p>Meter</p>
				</div>
				<div className="form-field form-field-linked-ast-serial-no">
					<span className="form-field-icon">
						<MdFormatListNumbered />
					</span>
					<input
						type="text"
						name="serialNo"
						id="serialNo"
						// value={trnFormData.asset.serialNo}
						onChange={setFormState}
						placeholder="asset id"
					/>
				</div>
				<div className="form-field form-field-ast-cartegory">
					<span className="form-field-icon">
						<MdWebAsset />
					</span>
					<input
						type="text"
						name="astCartegory"
						id="astCartegory"
						// value={trnFormData.asset.astCartegory}
						onChange={setFormState}
						placeholder="Asset Cartegory"
					/>
				</div>

				<div className="meter">
					<div className="form-field form-field-meter-type">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="meterTYpe"
							id="meterTYpe"
							// value={trnFormData.asset.meter.type}
							onChange={setFormState}
							placeholder="Type"
						/>
					</div>
					<div className="form-field form-field-meter-phase">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="meterPhase"
							id="meterPhase"
							// value={trnFormData.asset.meter.phase}
							onChange={setFormState}
							placeholder="Phase"
						/>
					</div>
					<div className="form-field form-field-meter-temper">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="meterTemper"
							id="meterTemper"
							// value={trnFormData.asset.meter.temper}
							onChange={setFormState}
							placeholder="Temper"
						/>
					</div>

					<div className="form-field form-field-meter-comments">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="meterComments"
							id="meterComments"
							// value={trnFormData.asset.meter.comments}
							onChange={setFormState}
							placeholder="Comments"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default TrnFormMeterMeterData;
