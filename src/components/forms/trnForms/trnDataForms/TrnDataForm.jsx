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
import FormHeader8 from "../../formComponents/formHeaders/FormHeader8";
import { useTrnForm } from "../../../../hooks/useTrnForm.js";
import PhotoApp from "../../../mediaApp/PhotoApp";
import { useDocumentSync } from "../../../../hooks/useDocumentSync";
import GeocodingApp from "../../../mediaApp copy/GeocodingApp";
import { capitalizeFirstLetter } from "../../../../utils/utils";
import { Timestamp } from "firebase/firestore";

// TODO: TrnDataForm - Make the trn form responsive
// TODO: astNoMedia - hide the media btn if there is not astNo
// TODO: insideBoxMedia - hide the media btn if the 'insideBox' selection is NOT yes
// TODO: keyPadMedia - hide the keyPadMedia btn if the input to both 'is there keyPap' and 'keyPadAccess' is not 'yes'.
// TODO: astadr.adr - enable field to be populated from google address API.
// TODO: astadr.gps - enable field to be populated from google address API.
// TODO: meter.manufaturer - enable a select dropdown wit option to complete manually if manufacture is not in the select drop down list
// TODO: linkedCb.isThereCb - enable the field to control CB audit form.
// TODO: linkedSeal.isThereSeal - enable the field to control Seal audit form.
// TODO: Keep list of asts in the meter audit form consistent from top to bottom. It must always follosw the following order: meter, cb, sel, box, and pole
// TODO: astNoMedia, insideBoxMedia, keyPadMedia - when taking media, always attach geo location where the media was taken. For this, use javascript geolocation api.
// TODO: Hide box and pole sections on the meter audit form

const validationSchema = object({});

const TrnDataForm = props => {
	// const { formData } = props;
	// formData is trn row data from ag grid table opbained from params.data
	// console.log(`props`, props);

	const [formData, setFormData] = useState(props.formData);
	// console.log(`formData`, formData);

	// get meter doc id
	const { id } = props.formData;
	// console.log(`id`, id);

	// get meter doc id
	const { erfNo } = props.formData.erfData;
	// console.log(`erfNo`, erfNo);

	// get trnType
	let trnType = formData?.metaData?.trnType;
	// console.log(`trnType`, trnType);

	// call useDocument to get realtime meter data
	const { error, document } = useDocumentSync("trns", id);
	// console.log(`document`, document);

	// get currnet user data
	const { user } = useAuthContext();
	// console.log(`user`, user)

	const [trn, setTrn] = useState({
		...formData,
		metaData: {
			...formData.metaData,
			updatedAtDatetime: Timestamp.now(),
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

	const { formState, fieldValidation, formSections } = useTrnForm(trn, setTrn);
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
				updatedAtDatetime: Timestamp.now(),
				updatedByUser: user.displayName,
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
			toast(`Trn form data succesfully!`, {
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

	useEffect(() => {
		if (document) {
			setTrn(document);
		}
	}, [document]);

	const handleOnChange = e => {
		const { name, value } = e.target;
		// console.log(`name`, name);
		// console.log(`value`, value);
		fieldValidation(name, value);
	};

	// const astNo = `${capitalizeFirstLetter(ast?.astData?.astNo)}`;

	const erfNumber = (
		<>
			Erf No <span className="data-emphasis">{erfNo}</span>.
		</>
	);

	let trnState_ = trnState === "submited" ? trnState : formState.state;
	trnState_ = `${capitalizeFirstLetter(trnState_)}`;
	const state = (
		<>
			State <span className="data-emphasis">{trnState_}</span>.
		</>
	);

	trnType = `${capitalizeFirstLetter(trnType)}`;
	const formName = <span className="data-emphasis">{`${trnType} Form`}</span>;

	return (
		<div className="form-wrapper">
			<div className="form-container spl-form-container">
				<FormHeader8
					// form name - dataLl
					dataLl={formName}
					// state = dataLr
					dataLr={state}
					// entity no (eg astNo, trnNo, erfNo)
					dataRl={erfNumber}
					closeModal={closeModal}
				/>
				<Formik
					// enableReinitialize
					initialValues={trn}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						// console.log(`formik form values: `, formik);
						// const disabled = !formik.dirty;
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
												{/* <FormBtn isPending={false} btnName="reset" /> */}
												<button
													type="reset"
													className="form-btn"
													onClick={() => closeModal()}
												>
													Close Form
												</button>
												<FormBtn
													isPending={response.isPending}
													btnName="submit"
													disabled={false}
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
				<PhotoApp />
				<GeocodingApp />
			</div>
		</div>
	);
};

export default TrnDataForm;
