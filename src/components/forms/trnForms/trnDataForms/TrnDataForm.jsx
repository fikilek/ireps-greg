import { Formik, Form } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { timestamp } from "../../../../firebaseConfig/fbConfig";
import useAuthContext from "../../../../hooks/useAuthContext";
import FormBtn from "../../formComponents/formBtn/FormBtn";
import { object } from "yup";
import useModal from "../../../../hooks/useModal";
import { useFirestore } from "../../../../hooks/useFirestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormHeader5 from "../../formComponents/formHeaders/FormHeader5";
import { useTrnForm } from "../../../../hooks/useTrnForm.js";

const validationSchema = object({});

const TrnDataForm = props => {
	const { formData } = props;
	// formData is trn row data from ag grid table opbained from params.data
	// console.log(`props`, props);

	// get currnet user data
	const { user } = useAuthContext();
	// console.log(`user`, user)

	const [trn, setTrn] = useState({
		...formData,
		metaData: {
			...formData.metaData,
			updatedAtDatetime: timestamp.fromDate(new Date()),
			updatedByUser: user.displayName,
		},
	});
	// console.log(`trn`, trn);

	// get formState
	const { trnState } = trn.metaData;
	// console.log(`trnState`, trnState);

	// get useFirestore for updating trn
	const { response, updateDocument, addDocument } = useFirestore("trns");

	// close the modal
	const { closeModal } = useModal();

	const { formState, fieldValidation, formSections } = useTrnForm(
		trn,
		setTrn
	);
	// console.log(`formSections`, formSections);
	// console.log(`formState`, formState);

	const onSubmit = values => {
		// console.log(`values`, values);
		// console.log(`formState`, formState)
		
		const newValues = {
			...values,
			metaData: {
				...values.metaData,
				trnState: formState.state,
			},
		};
		// console.log(`newValues`, newValues);

		if (newValues.id) {
			// console.log(`newValues id : [${newValues?.id}]`);
			updateDocument(newValues);
		} else {
			// console.log(`newValues NO id : [${newValues?.id}]`);
			addDocument(newValues);
		}
	};

	useEffect(() => {
		if (response.success) {
			closeModal();
			toast(`Trn form data succeesfully!`, {
				position: "bottom-left",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	}, [response, closeModal]);

	const handleOnChange = e => {
		const { name, value } = e.target;
		// console.log(`name`, name);
		fieldValidation(name, value);
	};

	return (
		<div className="form-wrapper">
			<div className="form-container spl-form-container">
				<FormHeader5
					formName={formData.metaData.trnType}
					trnState={trnState === "submited" ? trnState : formState.state}
					erfNo={formData.erfData.erfNo}
					closeModal={closeModal}
				/>
				<Formik
					initialValues={trn}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						// console.log(`formik form values: `, formik.values.astData.meter[0].trnData.meterInstallation.location.exactLocation);
						const disabled = !(formik.isValid && formik.dirty);
						// console.log(`formik.dirty`, formik.dirty);
						// console.log(`formik.isValid`, formik.isValid);
						// console.log(`formState`, disable);

						return (
							<Form
								onChange={e => {
									handleOnChange(e);
									// updateFormState(validationObject, formik.values);
								}}
							>
								{/* trn form */}
								<div className="trn-data-form">
									{/* trnDataForm */}
									{formSections &&
										formSections.map((formSection, index) => {
											// console.log(`formSection`, formSection);
											return <div key={index}>{formSection}</div>;
										})}

									<div className="form-btns">
										{!(trnState === "submited") ? (
											<>
												<FormBtn isPending={false} btnName="reset" />
												<FormBtn
													isPending={response.isPending}
													btnName="submit"
													disabled={disabled}
												/>
											</>
										) : (
											"VALID FORM SUBMITED - NO FURTHER SUBMISSIONS ALLOWED"
										)}
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

export default TrnDataForm;
