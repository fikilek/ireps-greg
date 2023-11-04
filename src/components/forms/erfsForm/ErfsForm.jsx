import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import "./ErfsForm.css";
import useModal from "../../../hooks/useModal";
import { useFirestore } from "../../../hooks/useFirestore";
import useAuthContext from "../../../hooks/useAuthContext";
import { toast } from "react-toastify";
import FormikControl from "../formComponents/formik/FormikControl";
import FormBtn from "../formComponents/formBtn/FormBtn";
import FormSection from "../formComponents/formSection/FormSection";
import FormHeader8 from "../formComponents/formHeaders/FormHeader8";
import { formSelectOptions } from "../../../utils/utils";
import { useCallback } from "react";
import { useMemo } from "react";
import ReverseGeocodingApp from "../../mediaApp copy/ReverseGeocodingApp";
import PhotoAppErf from "../../mediaApp/PhotoAppErf";
import cloneDeep from "lodash.clonedeep";

const ErfsForm = props => {
	// console.log(`ErfsForm props`, props);
	const { data: formData, hideHeader, disabled } = props?.formData;
	const { closeModal } = useModal();
	// console.log(`formData`, formData);

	const [active, setActive] = useState(null);

	// const { getTrnFormSection, getTrnValidationSchema } = useTrnForm(trn);

	const { response, updateDocument, addDocument } = useFirestore("erfs");

	// const resp = useMemo(() => response, [response]);

	const { user } = useAuthContext();
	// console.log(`user`, user)

	const onSubmit = useCallback(
		values => {
			console.log(`Erf Form formik submitted values`, values);

			if (values.id) {
				updateDocument(values);
			} else {
				addDocument(values);
			}
		},
		[addDocument, updateDocument]
	);

	// diplicate erf form
	const duplicateErfForm = () => {
		// console.log(`duplicating erfData`, formData);

		// 0. first clone the erf data
		const clonedErfData = cloneDeep(formData);

		// 1. remove id
		delete clonedErfData.id;
		// console.log(`clonedErfData without id`, clonedErfData);

		// 2. remove unit no
		const newClonedErfData = {
			...clonedErfData,
			propertyType: {
				...clonedErfData.propertyType,
				unitNo: "",
			},
		};
		// console.log(`newClonedErfData`, newClonedErfData);

		// 3. add clonedErfData to erfs
		addDocument(newClonedErfData);
	};

	useEffect(() => {
		// console.log(`response`, response);
		if (response.success) {
			closeModal();
			toast(
				`${formData.erfNo} ?  ${formData.erfNo} UPDATED / CREATED succeesfully!`,
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
	}, [response]);

	// form header dataL

	// erf form
	const formName = (
		<>
			<span className="data-emphasis">{"Erf Form"}</span>.
		</>
	);

	// erf no
	const erfNo = (
		<>
			Erf No <span className="data-emphasis">{formData.erfNo}</span>.
		</>
	);

	// duolicate form
	const duplicateForm = (
		<>
			<button className="data-emphasis fh-btn" onClick={duplicateErfForm}>
				{"Duplicate The Form"}
			</button>
			.
		</>
	);

	return (
		<div className="form-wrapper">
			<div className="form-container simcards-form-container">
				{hideHeader ? (
					""
				) : (
					<>
						<FormHeader8
							dataLl={formName}
							dataLr={erfNo}
							dataRl={duplicateForm}
							dataRr={""}
							closeModal={closeModal}
						/>
					</>
				)}
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
						// console.log(`formik`, formik);
						// console.log(`formik.isValid`, formik.isValid);
						// console.log(`disabled`, disabled);
						// console.log(`formik.values`, formik.values);

						return (
							<Form>
								<div className="ireps-form">
									<FormSection
										sectionData={{
											sectionName: "property-type",
											formik: formik,
										}}
										active={active}
										setActive={setActive}
									>
										<div className="ast proprty-type-wrapper">
											<div className="ast-wrapper">
												<div className="ast-row">
													<div>
														<FormikControl
															control="selectPropertyType"
															type="text"
															label="property type"
															name="propertyType.type"
															placeholder="Property Type"
															options={formSelectOptions.propertyTypeOptions}
														/>
													</div>
													<div className="half-row-50-50">
														<FormikControl
															control="input"
															type="text"
															label="unit name"
															name="propertyType.unitName"
															placeholder="Unit Name"
														/>
														<FormikControl
															control="input"
															type="text"
															label="unit no"
															name="propertyType.unitNo"
															placeholder="Unit No"
														/>
													</div>
												</div>
											</div>
										</div>
									</FormSection>

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
															readOnly={true}
															control="input"
															type="text"
															label="erf no"
															name="erfNo"
															placeholder="Erf No"
														/>
														<FormikControl
															control="select"
															type="text"
															label="erf status"
															name="erfStatus"
															placeholder="Erf Status"
															options={formSelectOptions.erfStatusOptions}
														/>
													</div>
													<div className="half-row-50-50">
														<FormikControl
															readOnly={true}
															control="input"
															type="number"
															label="gps latitude"
															name="address.gps.latitude"
															placeholder="Gps lat"
														/>
														<FormikControl
															readOnly={true}
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
															readOnly={true}
															control="input"
															type="text"
															label="suburd / tship"
															name="address.suburbTownship"
															placeholder="Suburb / Tship"
														/>
														<FormikControl
															readOnly={true}
															control="input"
															type="text"
															label="towm"
															name="address.town"
															placeholder="Town"
															// options={formSelectOptions.townOptions}
														/>
													</div>

													<div className="half-row-50-50">
														<FormikControl
															readOnly={true}
															control="input"
															type="text"
															label="ml / metro"
															name="address.lmMetro"
															placeholder="municipality"
															// options={formSelectOptions.lmMetroOptions}
														/>
														<FormikControl
															readOnly={true}
															control="input"
															type="text"
															label="dm"
															name="address.dm"
															placeholder="municipality"
															// options={formSelectOptions.dmOptions}
														/>
													</div>
													<div className="half-row-50-50">
														{" "}
														<FormikControl
															readOnly={true}
															control="input"
															type="text"
															label="ward no"
															name="address.ward"
															placeholder="Ward No"
														/>
														<FormikControl
															readOnly={true}
															control="input"
															type="text"
															label="province"
															name="address.province"
															placeholder="province"
															// options={formSelectOptions.provinceOptions}
														/>
													</div>
													<div className="half-row-50-50">
														<FormikControl
															readOnly={true}
															control="input"
															type="text"
															label="country"
															name="address.country"
															placeholder="Country"
															// options={formSelectOptions.countryOptions}
														/>

														<FormikControl
															control="mediaButton"
															type="button"
															label="Erf Media"
															name={`erfMedia`}
															placeholder="Erf Media"
															ml1="erfs"
														/>
													</div>
													<div>
														<FormikControl
															control="rgcButton"
															type="button"
															label="erf system address"
															name={`address.systemAdr`}
															placeholder="Erf System Address"
														/>
													</div>
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
														formik?.values?.customer?.type === "warm body"
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
														formik?.values?.customer?.type === "juristic person"
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
				<ReverseGeocodingApp />
				<PhotoAppErf />
			</div>
		</div>
	);
};
export default ErfsForm;
