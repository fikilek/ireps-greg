import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";

import useModal from "../../../hooks/useModal";
import { useFirestore } from "../../../hooks/useFirestore";
import useAuthContext from "../../../hooks/useAuthContext";
import { toast } from "react-toastify";
import FormikControl from "../formComponents/formik/FormikControl";
import FormBtn from "../formComponents/formBtn/FormBtn";
import FormSection from "../formComponents/formSection/FormSection";
import FormHeader4 from "../formComponents/formHeaders/FormHeader4";
import { formSelectOptions } from "../../../utils/utils";

const ErfsForm = props => {
	console.log(`props`, props);
	const { formData } = props;
	const { closeModal } = useModal();
	// console.log(`formData`, formData);

	const [active, setActive] = useState(null);

	// const { getTrnFormSection, getTrnValidationSchema } = useTrnForm(trn);

	const { response, updateDocument, addDocument } = useFirestore("erfs");

	const { user } = useAuthContext();
	// console.log(`user`, user)

	// const trnSpecificData = getTrnFormSection(
	// 	trn.astData.astCartegory,
	// 	trn.metaData.trnType
	// );
	// console.log(`trnSpecificData`, trnSpecificData)
	// const { jsx, trnData } = trnSpecificData;

	// const [_trn, set_trn] = useState({
	// 	...trn,
	// 	metaData: {
	// 		...trn.metaData,
	// 		updatedAtDatetime: timestamp.fromDate(new Date()),
	// 		updatedByUser: user.displayName,
	// 	},
	// 	trnData: trn.id ? trn.trnData : trnData,
	// });

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
			toast(
				`${formData.erfNo} ?  ${formData.erfNo} UPDATED' : Erf CREATED succeesfully!`,
				{
					position: "bottom-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				}
			);
		}
	}, [response, closeModal, formData.erfNo]);

	return (
		<div className="form-wrapper">
			<div className="form-container simcards-form-container">
				<FormHeader4
					formName={"Erf"}
					formNo={formData.erfNo}
					closeModal={closeModal}
				/>
				<Formik
					initialValues={formData}
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
						// console.log(`formik.values`, formik.values);

						return (
							<Form>
								<div className="ireps-form">
									<FormSection
										sectionData={{
											sectionName: "customer-adr",
										}}
										active={active}
										setActive={setActive}
									>
										<div className="ast customer-adr-wrapper">
											<div className="ast-wrapper">
												<div className="ast-row">
													<div className="half-row-50-50">
														<FormikControl
															control="input"
															type="text"
															label="erf no"
															name="erfNo"
															placeholder="Erf No"
														/>
													</div>
													<div className="half-row-50-50">
														<FormikControl
															control="input"
															type="number"
															label="gps latitude"
															name="address.gps.latitude"
															placeholder="Gps lat"
														/>
														<FormikControl
															control="input"
															type="number"
															label="gps longitude"
															name="address.gps.longitude"
															placeholder="Gps lon"
														/>
													</div>
													<FormikControl
														control="input"
														type="text"
														label="street address"
														name="address.street"
														placeholder="Street Address"
													/>
													<div className="half-row-50-50">
														<FormikControl
															control="input"
															type="text"
															label="suburd / tship"
															name="address.suburbTownship"
															placeholder="Suburb / Tship"
														/>
														<FormikControl
															control="select"
															type="text"
															label="towm"
															name="address.town"
															placeholder="Town"
															options={formSelectOptions.townOptions}
														/>
													</div>

													<div className="half-row-50-50">
														<FormikControl
															control="select"
															type="text"
															label="ml / metro"
															name="address.lmMetro"
															placeholder="municipality"
															options={formSelectOptions.lmMetroOptions}
														/>
														<FormikControl
															control="select"
															type="text"
															label="dm"
															name="address.dm"
															placeholder="municipality"
															options={formSelectOptions.dmOptions}
														/>
													</div>
													<div className="half-row-50-50">
														{" "}
														<FormikControl
															control="input"
															type="text"
															label="ward no"
															name="address.ward"
															placeholder="Ward No"
														/>
														<FormikControl
															control="select"
															type="text"
															label="province"
															name="address.province"
															placeholder="province"
															options={formSelectOptions.provinceOptions}
														/>
													</div>
													<FormikControl
														control="select"
														type="text"
														label="country"
														name="address.country"
														placeholder="Country"
														options={formSelectOptions.countryOptions}
													/>
													<FormikControl
														control="input"
														type="text"
														label="system address"
														name="address.systemAdr"
														placeholder="system address"
													/>
												</div>
											</div>
										</div>
									</FormSection>

									<FormSection
										sectionData={{
											sectionName: "customer",
										}}
										active={active}
										setActive={setActive}
									>
										<div className="ast">
											<div className="ast-wrapper">
												<div className="ast-row">
													<FormikControl
														control="select"
														type="text"
														label="custormer cartegory"
														name="customer.cartegory"
														placeholder="Custormer Cartegory"
														options={formSelectOptions.customerCartegoryOptions}
													/>
													<FormikControl
														control="select"
														type="text"
														label="custormer type"
														name="customer.type"
														placeholder="Custormer Type"
														options={formSelectOptions.customerTypeOptions}
													/>
												</div>{" "}
												<div
													className={`ast-row  customer-type-warm-body ${
														formik.values.customer.type === "warm body"
															? "show-section"
															: "hide-section"
													}`}
												>
													<div className="half-row-50-50">
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
													</div>
													<div className="half-row-50-50">
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
															options={formSelectOptions.genderOptions}
														/>
													</div>
												</div>
												<div
													className={`ast-row customer-type-juristic-person ${
														formik.values.customer.type === "juristic person"
															? "show-section"
															: "hide-section"
													} `}
												>
													<div className="half-row-50-50">
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
													</div>
													<div className="half-row-50-50">
														<FormikControl
															control="input"
															type="text"
															label="CIPC name"
															name="customer.juristicPerson.registeredName"
															placeholder="Registered CIPC Nane"
														/>
														<FormikControl
															control="input"
															type="text"
															label="CIPC no"
															name="customer.juristicPerson.registeredNo"
															placeholder="Registered CIPC No"
														/>
													</div>
												</div>
											</div>
										</div>

										<div className="custormer-billing"></div>
									</FormSection>

									{/* contact-person */}
									<FormSection
										sectionData={{
											sectionName: "customer-contact-person",
										}}
										active={active}
										setActive={setActive}
									>
										<div className="ast">
											<div className="ast-wrapper">
												<div className="contact-person ast-row">
													<div className="half-row-50-50">
														<FormikControl
															control="input"
															type="text"
															label="surname"
															name="customer.contactPerson.surname"
															placeholder="Surname"
														/>
														<FormikControl
															control="input"
															type="text"
															label="name"
															name="customer.contactPerson.name"
															placeholder="Name"
														/>
													</div>
													<div className="half-row-50-50">
														<FormikControl
															control="input"
															type="text"
															label="land line"
															name="customer.contactPerson.landLine"
															placeholder="Land Line"
														/>
														<FormikControl
															control="input"
															type="text"
															label="WhatsApp"
															name="customer.contactPerson.whatsApp"
															placeholder="WhatsApp"
														/>
													</div>
												</div>
												<div className="contact-person ast-row">
													<div className="half-row-50-50">
														<FormikControl
															control="input"
															type="text"
															label="cell no"
															name="customer.contactPerson.cellNo"
															placeholder="Cell No"
														/>
													</div>
													<div>
														<FormikControl
															control="input"
															type="text"
															label="email adr"
															name="customer.contactPerson.emailAdr"
															placeholder="Email Adr"
														/>
													</div>
												</div>
											</div>
										</div>
									</FormSection>

									{/* billig */}
									<FormSection
										sectionData={{
											sectionName: "billing",
										}}
										active={active}
										setActive={setActive}
									>
										<div className="ast">
											<div className="ast-wrapper">
												<div className="ast-row billing-wrapper">
													<div className="half-row-50-50">
														<FormikControl
															control="input"
															type="text"
															label="tariff"
															name="billing.tariff"
															placeholder="Tariff"
														/>
														<FormikControl
															control="select"
															type="text"
															label="indigent?"
															name="billing.indigent"
															placeholder="Indigent"
															options={formSelectOptions.yesNoOptions}
														/>
													</div>
													<div className="half-row-20-50">
														<FormikControl
															control="input"
															type="text"
															label="Accounts"
															name="billing.accountNo.length"
															placeholder="Accounts"
														/>
														<FormikControl
															control="select"
															type="text"
															label="stand use"
															name="standUse"
															placeholder="stand use"
															options={formSelectOptions.standUseOptions}
														/>
													</div>
												</div>
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
export default ErfsForm;
