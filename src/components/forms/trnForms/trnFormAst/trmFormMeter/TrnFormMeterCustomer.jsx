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

const TrnFormMeterCustomer = ({ formState, setFormState }) => {
	return (
		<>
			{/* customer  */}
			<div className="fs trn-form-owner-occupant">
				<div className="fs-title">
					<p>Occupant / Owner</p>
				</div>

				<div className="form-sub-section owner-occupant-types">
					<div className="form-field form-field-owner-occupant-cartegory">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="cartegory"
							id="cartegory"
							// value={trnFormData.ownerOccupant.cartegory}
							onChange={setFormState}
							placeholder="Cartegory ['owner' or 'occupant']"
						/>
					</div>
					<div className="form-field form-field-owner-occupant-type">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="type"
							id="type"
							// value={trnFormData.ownerOccupant.type}
							onChange={setFormState}
							placeholder="Type ['warm body' or 'jusistic']"
						/>
					</div>
				</div>

				<div className="form-sub-section owner-occupant-warm-body">
					<div className="form-field form-field-owner-occupant-warm-body-surname">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type=""
							name="warmBodySurname"
							id="warmBodySurname"
							// value={trnFormData.ownerOccupant.warmBodySurname}
							onChange={setFormState}
							placeholder="Surname"
						/>
					</div>
					<div className="form-field form-field-owner-occupant-warm-body-name">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="warmBodyname"
							id="warmBodyname"
							// value={trnFormData.ownerOccupant.warmBodyname}
							onChange={setFormState}
							placeholder="Name"
						/>
					</div>
					<div className="form-field form-field-owner-occupant-warm-body-id-no">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="warmBodyIdNo"
							id="warmBodyIdNo"
							// value={trnFormData.ownerOccupant.warmBodyIdNo}
							onChange={setFormState}
							placeholder="Id No"
						/>
					</div>
				</div>

				<div className="form-sub-section owner-occupant-juristic-person">
					<div className="form-field form-field-owner-occupant-juristic-person-name">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type=""
							name="juristicPersonName"
							id="juristicPersonName"
							// value={trnFormData.ownerOccupant.juristicPerson.name}
							onChange={setFormState}
							placeholder="Name"
						/>
					</div>
					<div className="form-field form-field-owner-occupant-juristic-person-trading-or-other-name">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="tradingOrOtherName"
							id="tradingOrOtherName"
							// value={trnFormData.ownerOccupant.tradingOrOtherName}
							onChange={setFormState}
							placeholder="Trading Name Or Other Name"
						/>
					</div>
					<div className="form-field form-field-owner-occupant-juristic-person-registration-no">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="registrationNo"
							id="registrationNo"
							// value={trnFormData.ownerOccupant.registrationNo}
							onChange={setFormState}
							placeholder="Registration No"
						/>
					</div>
				</div>

				<div className="form-sub-section owner-occupant-contact-person">
					<div className="form-field form-field-owner-occupant-contact-person-surname">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="contactPersonSurname"
							id="contactPersonSurname"
							// value={trnFormData.contactPerson.surname.}
							onChange={setFormState}
							placeholder="Contact Person Surname"
						/>
					</div>
					<div className="form-field form-field-owner-occupant-contact-person-name">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="contactPersonName"
							id="contactPersonName"
							// value={trnFormData.contactPerson.name.}
							onChange={setFormState}
							placeholder="Contact Person Name"
						/>
					</div>
					<div className="form-field form-field-owner-occupant-contact-person-landline">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="landline"
							id="landline"
							// value={trnFormData.contactPerson.landline}
							onChange={setFormState}
							placeholder="Landline"
						/>
					</div>
					<div className="form-field form-field-owner-occupant-contact-person-cellphone-whatsapp">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="cellPhoneWhatsapp"
							id="cellPhoneWhatsapp"
							// value={trnFormData.contactPerson.cellPhoneWhatsapp}
							onChange={setFormState}
							placeholder="Cell Phonr WhatsApp"
						/>
					</div>
					<div className="form-field form-field-owner-occupant-contact-person-cellphone-voice">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="cellPhoneVoice"
							id="cellPhoneVoice"
							// value={trnFormData.contactPerson.cellPhoneVoice}
							onChange={setFormState}
							placeholder="Cell Phone Voice"
						/>
					</div>
					<div className="form-field form-field-owner-occupant-contact-person-email">
						<span className="form-field-icon">
							<MdWebAsset />
						</span>
						<input
							type="text"
							name="cellPhoneEmail"
							id="cellPhoneEmail"
							// value={trnFormData.contactPerson.email}
							onChange={setFormState}
							placeholder="Email"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default TrnFormMeterCustomer;
