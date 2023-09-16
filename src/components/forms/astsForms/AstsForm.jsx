import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { timestamp } from "../../../firebaseConfig/fbConfig";
import useAuthContext from "../../../hooks/useAuthContext";
import FormBtn from "../formComponents/formBtn/FormBtn";
import FormikControl from "../formComponents/formik/FormikControl";
import useModal from "../../../hooks/useModal";
import { useFirestore } from "../../../hooks/useFirestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormHeader8 from "../formComponents/formHeaders/FormHeader8";
import { useAstsForm } from "../../../hooks/useAstsForm";
import { capitalizeFirstLetter } from "../../../utils/utils";
import { Timestamp } from "firebase/firestore";

const AstsForm = ({ formData }) => {
	// console.log(`formData`, formData);

	const { getFormSection, getValidationSchema } = useAstsForm();

	const { response, updateDocument } = useFirestore("asts");
	const { closeModal } = useModal();

	const { user } = useAuthContext();
	// console.log(`user`, user)

	const [ast] = useState({
		...formData.data,
		metaData: {
			...formData.data.metaData,
			updatedAtDatetime: Timestamp.now(),
			updatedByUser: user.displayName,
			updatedByUserId: user.uid,
		},
	});
	// console.log(`ast`, ast);

	const onSubmit = values => {
		// console.log(`values`, values);
		updateDocument(values);
	};
	// console.log(`response`, response);

	useEffect(() => {
		if (response.success) {
			closeModal();
			console.log(`ast`, ast);
			toast(`Asset ${ast?.astData?.astNo} data UPDATED" succeesfully!`, {
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
	}, [response, closeModal, ast?.astData?.astNo, ast]);

	const astState = `${capitalizeFirstLetter(ast?.astData?.astState)}`;
	const astCat = `${capitalizeFirstLetter(ast?.astData?.astCartegory)}`;
	const state = (
		<>
			State <span className="data-emphasis">{astState}</span>.
		</>
	);
	const formName = ( <span className="data-emphasis">{`${astCat} Form`}</span>)

	return (
		<div className="form-wrapper">
			<div className="form-container simcards-form-container">
				<FormHeader8
					// form name - dataLl
					dataLl={formName}
					// state = dataLr
					dataLr={state}
					// entity no (eg astNo, trnNo, erfNo)
					dataRl={""}
					closeModal={closeModal}
				/>
				<Formik
					initialValues={ast}
					onSubmit={onSubmit}
					validationSchema={getValidationSchema(ast?.astData?.astCartegory)}
				>
					{formik => {
						const disabled = !(formik.isValid && formik.dirty);
						// console.log(`formik.dirty`, formik.dirty);
						// console.log(`formik.isValid`, formik.isValid);
						// console.log(`disabled`, disabled);
						// console.log(`formik`, formik);
						return (
							<Form>
								<div className="ast-form">
									{/* common data */}
									<div className="common-data">
										{/* simcardPhoneNumber */}
										<FormikControl
											control="input"
											type="text"
											label="ast no"
											name="astData.astNo"
											placeholder="asset No"
										/>
										{/* simcardPhoneNumber */}
										<FormikControl
											control="input"
											type="text"
											label="serial no"
											name="astData.astSerialNo"
											placeholder="Serial Number"
										/>
									</div>

									{/* specific data */}
									<div className="specific-data">
										{ast &&
											ast?.astData?.astCartegory &&
											getFormSection(ast?.astData?.astCartegory)}
									</div>
								</div>
								<div className="form-btns">
									<FormBtn isPending={false} btnName="reset" />
									<FormBtn
										isPending={response?.isPending}
										btnName="submit"
										disabled={disabled}
									/>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default AstsForm;
