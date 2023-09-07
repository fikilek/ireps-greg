import React, { useContext, useState, useEffect, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import "./trnsForm.css";
import {
	MdFormatListNumbered,
	MdHistory,
	MdLockClock,
	MdMyLocation,
	MdPerson,
	MdWebAsset,
} from "react-icons/md";
import { GiChoice } from "react-icons/gi";
import { ModalContext } from "../../../contexts/ModalContext";
import { UserContext } from "../../../contexts/PoContext";
import { useNavigate } from "react-router-dom";
import grv1 from "../../../images/grv1.png";
import { capitalize, capitalizeFirstLetter } from "../../../utils/utils";
import TrnFormMeter from "./trnFormAst/trmFormMeter/TrnFormMeter";
import useModal from "../../../hooks/useModal";
import { useFirestore } from "../../../hooks/useFirestore";
import useAuthContext from "../../../hooks/useAuthContext";
import { timestamp } from "../../../firebaseConfig/fbConfig";
import { toast } from "react-toastify";
import FormikControl from "../formComponents/formik/FormikControl";
import FormBtn from "../formComponents/formBtn/FormBtn";
import FormHeader3 from "../formComponents/formHeaders/FormHeader3";
import { useTrnForm } from "../../../hooks/useTrnForm";
import FormSection from "../formComponents/formSection/FormSection";
import { Timestamp } from "firebase/firestore";

const genderOptions = [
	{ key: "choose", value: "choose" },
	{ key: "male", value: "male" },
	{ key: "female", value: "female" },
	{ key: "none", value: "none" },
];

const customerCartegoryOptions = [
	{ key: "choose", value: "choose" },
	{ key: "owner", value: "owner" },
	{ key: "occupant", value: "occupant" },
];

const customerTypeOptions = [
	{ key: "choose", value: "choose" },
	{ key: "warm body", value: "warm body" },
	{ key: "juristic person", value: "juristic person" },
];

const TrnsForm = props => {
	const { formData: trn } = props;
	const { closeModal } = useModal();
	// console.log(`formData`, formData);
	// console.log(`trn`, trn);

	const [active, setActive] = useState(null);

	const { getTrnFormSection, getTrnValidationSchema } = useTrnForm(trn);

	const { response, updateDocument, addDocument } = useFirestore("trns");

	const { user } = useAuthContext();
	// console.log(`user`, user)

	const trnSpecificData = getTrnFormSection(
		trn.astData.astCartegory,
		trn.metaData.trnType
	);
	// console.log(`trnSpecificData`, trnSpecificData)
	const { jsx, trnData } = trnSpecificData;

	const [_trn, set_trn] = useState({
		...trn,
		metaData: {
			...trn.metaData,
			updatedAtDatetime: Timestamp.now(),
			updatedByUser: user.displayName,
		},
		trnData: trn.id ? trn.trnData : trnData,
	});

	const onSubmit = values => {
		// console.log(`formik submitted values`, values);
		if (values.id) {
			updateDocument(values);
		} else {
			addDocument(values);
		}
	};
	
	// console.log(`response`, response);

	useEffect(() => {
		if (response.success) {
			closeModal();
			toast(`Transaction for Asset No: ${trn.astData.astNo} ${_trn.metaData.id? "UPDATED" : "CREATED"} succeesfully!`, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	}, [response, closeModal, trn.astData.astNo]);

	return (
		<div className="form-wrapper">
			<div className="form-container simcards-form-container">
				<FormHeader3 trn={_trn} closeModal={closeModal} />
				<Formik
					initialValues={_trn}
					onSubmit={onSubmit}
					// validationSchema={getTrnValidationSchema(
					// 	trn.astData.astCartegory,
					// 	trn.metaData.trnType
					// )}
				>
					{formik => {
						const disabled = !(formik.isValid && formik.dirty);
						// console.log(`formik.dirty`, formik.dirty);
						// console.log(`formik.isValid`, formik.isValid);
						// console.log(`disabled`, disabled);
						// console.log(`formik`, formik);
						
						return (
							<Form>
								{/* trn form */}
								<div className="trn-form">
									{/* customer details */}
									<FormSection
										sectionData={{
											sectionName: "customer-details",
											astCat: trn.astData.astCartegory,
											trnType: trn.metaData.trnType,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="customer-cartegory-type">
											<FormikControl
												control="select"
												type="text"
												label="custormer cartegory"
												name="customer.cartegory"
												placeholder="Custormer Cartegory"
												options={customerCartegoryOptions}
											/>
											<FormikControl
												control="select"
												type="text"
												label="custormer type"
												name="customer.type"
												placeholder="Custormer Type"
												options={customerTypeOptions}
											/>
										</div>
										<div
											className={`customer-type-warm-body ${
												formik.values.customer.type === "warm body"
													? "show-section"
													: "hide-section"
											}`}
										>
											<FormikControl
												control="input"
												type="text"
												label="surname"
												name="customer.warmBody.surname"
												placeholder="Surname"
											/>
											<FormikControl
												control="input"
												type="text"
												label="name"
												name="customer.warmBody.name"
												placeholder="Name"
											/>
											<FormikControl
												control="input"
												type="text"
												label="id no"
												name="customer.warmBody.idNo"
												placeholder="Id No"
											/>
											<FormikControl
												control="select"
												type="text"
												label="gender"
												name="customer.warmBody.gender"
												placeholder="Gender"
												options={genderOptions}
											/>
										</div>
										<div
											className={`customer-type-juristic-person ${
												formik.values.customer.type === "juristic person"
													? "show-section"
													: "hide-section"
											} `}
										>
											<FormikControl
												control="input"
												type="text"
												label="legal name"
												name="customer.juristicPerson.name"
												placeholder="Legal ame"
											/>
											<FormikControl
												control="input"
												type="text"
												label="trading name"
												name="customer.juristicPerson.tradingName"
												placeholder="Trading Name"
											/>
											<FormikControl
												control="input"
												type="text"
												label="registered CIPC name"
												name="customer.juristicPerson.registeredName"
												placeholder="Registered CIPC Nane"
											/>
											<FormikControl
												control="input"
												type="text"
												label="registered CIPC no"
												name="customer.juristicPerson.registeredNo"
												placeholder="Registered CIPC No"
											/>
										</div>
										<div className="custormer-billing"></div>
									</FormSection>

									{/* custormer-contact-person */}
									<FormSection
										sectionData={{
											sectionName: "customer-contact-person",
											astCat: trn.astData.astCartegory,
											trnType: trn.metaData.trnType,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="contact-person">
											<FormikControl
												control="input"
												type="text"
												label="surname"
												name="contactPerson.surname"
												placeholder="Surname"
											/>
											<FormikControl
												control="input"
												type="text"
												label="name"
												name="contactPerson.name"
												placeholder="Name"
											/>
											<FormikControl
												control="input"
												type="text"
												label="land line"
												name="contactPerson.landLine"
												placeholder="Land Line"
											/>
											<FormikControl
												control="input"
												type="text"
												label="WhatsApp"
												name="contactPerson.whatsApp"
												placeholder="WhatsApp"
											/>
											<FormikControl
												control="input"
												type="text"
												label="cell no"
												name="contactPerson.cellNo"
												placeholder="Cell No"
											/>
											<FormikControl
												control="input"
												type="text"
												label="email adr"
												name="contactPerson.emailAdr"
												placeholder="Email Adr"
											/>
										</div>
									</FormSection>

									{/* customer adr */}
									<FormSection
										sectionData={{
											sectionName: "customer-adr",
											astCat: trn.astData.astCartegory,
											trnType: trn.metaData.trnType,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="customer-adr-wrapper">
											<div className="customer-address">
												<FormikControl
													control="input"
													type="text"
													label="street address"
													name="customerAdr.streetAdr"
													placeholder="Street Address"
												/>
												<FormikControl
													control="input"
													type="text"
													label="erf no"
													name="customerAdr.erfNo"
													placeholder="Erf No"
												/>
												<FormikControl
													control="input"
													type="text"
													label="ward no"
													name="customerAdr.wardNo"
													placeholder="Ward No"
												/>
											</div>
											<div className="munic-town-suburb">
												<FormikControl
													control="input"
													type="text"
													label="suburd / tship"
													name="customerAdr.suburbTship"
													placeholder="Suburb / Tship"
												/>
												<FormikControl
													control="input"
													type="text"
													label="towm"
													name="customerAdr.town"
													placeholder="Town"
												/>
												<FormikControl
													control="input"
													type="text"
													label="municipality"
													name="customerAdr.municipality"
													placeholder="municipality"
												/>
											</div>
											<div className="province-country">
												<FormikControl
													control="input"
													type="text"
													label="province"
													name="customerAdr.province"
													placeholder="province"
												/>
												<FormikControl
													control="input"
													type="text"
													label="country"
													name="customerAdr.country"
													placeholder="Country"
												/>
												<FormikControl
													control="input"
													type="text"
													label="system address"
													name="customerAdr.systemAdr"
													placeholder="system address"
												/>
											</div>
										</div>
									</FormSection>

									{/* trn-data */}
									<FormSection
										sectionData={{
											sectionName: "trn-data",
											astCat: trn.astData.astCartegory,
											trnType: trn.metaData.trnType,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="ast-data-wrapper">
											{
												jsx
											}
										</div>
									</FormSection>

									{/* metadata */}
									<FormSection
										sectionData={{
											sectionName: "metadata",
											astCat: trn.astData.astCartegory,
											trnType: trn.metaData.trnType,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="metadata-updated-created">
											{/* updated */}
											<div className="updated">
												<FormikControl
													control="input"
													type="text"
													label="updated by user"
													name="metaData.updatedByUser"
													readOnly="readOnly"
													placeholder="updated by user"
												/>

												<FormikControl
													control="datetime"
													label="updated at datetime"
													name="metaData.updatedAtDatetime"
													readOnly="readOnly"
													dateFormat="yyyy MM dd - HH:mm:ss"
													placeholder="updated at datetime"
												/>
											</div>

											{/* create */}
											<div className="created">
												<FormikControl
													control="input"
													type="text"
													label="created by user"
													name="metaData.createdByUser"
													readOnly="readOnly"
													placeholder="created by user"
												/>

												<FormikControl
													control="datetime"
													label="created at datetime"
													name="metaData.createdAtDatetime"
													readOnly="readOnly"
													dateFormat="yyyy MM dd - HH:mm:ss"
													placeholder="dated at datetime"
												/>
											</div>
										</div>
									</FormSection>

									<div className="form-btns">
										<FormBtn isPending={false} btnName="reset" />
										<FormBtn
											isPending={response.isPending}
											btnName="submit"
											disabled={disabled}
										/>
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};
export default TrnsForm;
