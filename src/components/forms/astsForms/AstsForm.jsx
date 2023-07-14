import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdLockClock, MdPerson } from "react-icons/md";
import { timestamp } from "../../../firebaseConfig/fbConfig";
import useAuthContext from "../../../hooks/useAuthContext";
import FormBtn from "../formComponents/formBtn/FormBtn";
import { object, string } from "yup";
import TextError from "../formComponents/formError/TextError";
import FormikControl from "../formComponents/formik/FormikControl";
import FormHeader1 from "../formComponents/formHeaders/FormHeader1";
import useModal from "../../../hooks/useModal";
import { useFirestore } from "../../../hooks/useFirestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormHeader2 from "../formComponents/formHeaders/FormHeader2";
import { useAstsForm } from "../../../hooks/useAstsForm";
import { capitalizeFirstLetter } from "../../../utils/utils";

const AstsForm = ({ formData }) => {
	// console.log(`formData`, formData);

	const { getFormSection, getValidationSchema } = useAstsForm();

	const { response, updateDocument } = useFirestore("asts");
	const { closeModal } = useModal();

	const { user } = useAuthContext();
	// console.log(`user`, user)

	const [ast] = useState({
		...formData,
		metaData: {
			...formData.metaData,
			updatedAtDatetime: timestamp.fromDate(new Date()),
			updatedByUser: user.displayName,
		},
	});

	const onSubmit = values => {
		// console.log(`values`, values);
		updateDocument(values);
	};
	// console.log(`response`, response);

	useEffect(() => {
		if (response.success) {
			closeModal();
			toast(`Asset ${ast.astData.astNo} data UPDATED" succeesfully!`, {
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
	}, [response, closeModal, ast.astData.astNo]);

	return (
		<div className="form-wrapper">
			<div className="form-container simcards-form-container">
				<FormHeader2
					formName={`${capitalizeFirstLetter(ast.astData.astCartegory)} Form`}
					astState={ast.astData.astState}
					astCartegory={ast.astData.astCartegory}
					closeModal={closeModal}
				/>
				<Formik
					initialValues={ast}
					onSubmit={onSubmit}
					validationSchema={getValidationSchema(
						ast.astData.astCartegory
					)}
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
											ast.astData.astCartegory &&
											getFormSection(ast.astData.astCartegory)}
									</div>

								</div>
								<div className="form-btns">
									<FormBtn isPending={false} btnName="reset" />
									<FormBtn
										isPending={response.isPending}
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
