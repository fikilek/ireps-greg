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

const TrnFormMeterMetaData = ({ formState, setFormState }) => {
	return (
		<>
			{/* metadata */}
			<div className="trn-form-meta-data">
				<div className="fs trn-form-updated">
					<div className="fs-title">
						<p>Last update</p>
					</div>
					<div className="form-field trn-form-updated-at-datetime">
						<span className="form-field-icon">
							<MdLockClock />
						</span>
						<input
							type="datetime-local"
							name="updatedAtDatetime"
							id="updatedAtDatetime"
							value={formState.metaData.updatedAtDatetime}
							onChange={setFormState}
							placeholder="Updated At Datetime"
						/>
					</div>
					<div className="form-field trn-form-updated-at-location">
						<span className="form-field-icon">
							<MdMyLocation />
						</span>
						<input
							type="gps"
							name="updatedAtLoocation"
							id="updatedAtLocation"
							value={formState.metaData.updatedAtLocation}
							onChange={setFormState}
							placeholder="Updated At Location"
						/>
					</div>
					<div className="form-field trn-form-updated-by-user">
						<span className="form-field-icon">
							<MdPerson />
						</span>
						<input
							type="text"
							name="updatedByUser"
							id="updatedByUser"
							value={formState.metaData.updatedByUser}
							onChange={setFormState}
							placeholder="Updated By User"
						/>
					</div>
				</div>
				<div className="fs trn-form-created">
					<div className="fs-title">
						<p>Created</p>
					</div>
					<div className="form-field trn-form-created-at-datetime">
						<span className="form-field-icon">
							<MdLockClock />
						</span>
						<input
							type="datetime-local"
							name="createdAtDatetime"
							id="createdAtDatetime"
							value={formState.metaData.createdAtDatetime}
							onChange={setFormState}
							placeholder="Created At Datetime"
						/>
					</div>
					<div className="form-field trn-form-created-at-location">
						<span className="form-field-icon">
							<MdMyLocation />
						</span>
						<input
							type="gps"
							name="createdAtLocation"
							id="createdAtLocation"
							value={formState.metaData.createdAtLocation}
							onChange={setFormState}
							placeholder="Created At Location"
						/>
					</div>
					<div className="form-field trn-form-created-by-user">
						<span className="form-field-icon">
							<MdPerson />
						</span>
						<input
							type="text"
							name="createdByUser"
							id="createdByUser"
							value={formState.metaData.createdByUser}
							onChange={setFormState}
							placeholder="Created By User"
						/>
					</div>
				</div>
				<div className="form-field trn-form-type">
					<span className="form-field-icon">
						<GiChoice />
					</span>
					<input
						type="text"
						name="trnType"
						id="trnType"
						value={formState.metaData.trnType}
						onChange={setFormState}
						placeholder="Transaction Type"
					/>
				</div>
				<div className="form-field trn-form-history">
					<span className="form-field-icon">
						<MdHistory />
					</span>
					<input
						type="number"
						name="trnHistory"
						id="trnHistory"
						value={formState.metaData.trnHistory}
						onChange={setFormState}
						placeholder="Transaction History"
					/>
				</div>
			</div>
		</>
	);
};

export default TrnFormMeterMetaData;
