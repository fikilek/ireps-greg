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

const TrnFormMeterCustomerAdr = ({ formState, setFormState }) => {
	return (
		<>
			{/* customer address */}
			<div className="fs trn-form-address">
				<div className="trn-form-adr">
					<div className="fs-title">
						<p>Customer Address</p>
						<p>Erf No</p>
					</div>
					<div className="form-field form-field-complex-name">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="complexName"
							id="complexName"
							// value={trnFormData.address.complexName}
							onChange={setFormState}
							placeholder="Complex Name"
						/>
					</div>
					<div className="form-field form-field-complex-no">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="complexNo"
							id="complexNo"
							// value={trnFormData.address.complexNo}
							onChange={setFormState}
							placeholder="Complex No"
						/>
					</div>
					<div className="form-field form-field-street-name">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="streetName"
							id="streetName"
							// value={trnFormData.address.streetName}
							onChange={setFormState}
							placeholder="Street Name"
						/>
					</div>
					<div className="form-field form-field-street-no">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="streetNo"
							id="streetNo"
							// value={trnFormData.address.streetNo}
							onChange={setFormState}
							placeholder="Street No"
						/>
					</div>
					<div className="form-field form-field-subSuburnOrSubTshipName">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="subSuburnOrSubTshipName"
							id="subSuburnOrSubTshipName"
							// value={trnFormData.address.subSuburnOrSubTshipName}
							onChange={setFormState}
							placeholder="Sub-Suburn or Sub Tship Name"
						/>
					</div>
					<div className="form-field form-field-suburbTshipName">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="suburbTshipName"
							id="suburbTshipName"
							// value={trnFormData.address.suburbTshipName}
							onChange={setFormState}
							placeholder="Suburb/Tship Name"
						/>
					</div>
					<div className="form-field form-field-townName">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="townName"
							id="townName"
							// value={trnFormData.address.townName}
							onChange={setFormState}
							placeholder="Town Name"
						/>
					</div>
					<div className="form-field form-field-localMunicipalityName">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="localMunicipalityName"
							id="localMunicipalityName"
							// value={trnFormData.address.localMunicipalityName}
							onChange={setFormState}
							placeholder="Local Municipality Name"
						/>
					</div>
					<div className="form-field form-field-provinceName">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="provinceName"
							id="provinceName"
							// value={trnFormData.address.provinceName}
							onChange={setFormState}
							placeholder="Province Name"
						/>
					</div>
					<div className="form-field form-field-contryName">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="contryName"
							id="contryName"
							// value={trnFormData.address.contryName}
							onChange={setFormState}
							placeholder="Contry Name"
						/>
					</div>
				</div>
				<div className="trn-form-adr-system">
					<div className="form-field form-field-system-adr">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="systemAdr"
							id="systemAdr"
							// value={trnFormData.address.systemAdr}
							onChange={setFormState}
							placeholder="System Address"
						/>
					</div>
				</div>
				<div className="trn-form-adr-media">
					<div className="form-field form-field-adr-voice-note">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="voiceNote"
							id="voiceNote"
							// value={trnFormData.address.voiceNote}
							onChange={setFormState}
							placeholder="Address Voice Note"
						/>
					</div>
					<div className="form-field form-field-adr-photos">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="adrPhotos"
							id="adrPhotos"
							// value={trnFormData.address.adrPhotos}
							onChange={setFormState}
							placeholder="Address Photos"
						/>
					</div>
					<div className="form-field form-field-adr-videos">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="adrVideos"
							id="adrVideos"
							// value={trnFormData.address.adrVideos}
							onChange={setFormState}
							placeholder="Address Videos"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default TrnFormMeterCustomerAdr;
