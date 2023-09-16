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

const validationSchema = object({
	simcardNumber: string().required("required"),
	simcardPhoneNumber: string().required("required"),
	simcardType: string().required("required"),
	networkOperator: string().required("required"),
	memory: string().required("required"),
});

const SimcardsForm = ({ formData }) => {
	// console.log(`formData`, formData);

	const { addDocument, response, updateDocument } = useFirestore("simcards");
	const { closeModal } = useModal();

	const { user } = useAuthContext();
	// console.log(`user`, user)

	const [simcard] = useState({
		...formData,
		metaData: {
			...formData.metaData,
			updatedAtDatetime: timestamp.fromDate(new Date()),
			updatedByUser: user.displayName,
			updatedByUserId: user.uid,
		},
	});

	const onSubmit = values => {
		// console.log(`values`, values);
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
			toast(`Simard data UPDATED" succeesfully!`, {
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
	}, [response, closeModal]);

	return (
		<div className="form-wrapper">
			<div className="form-container simcards-form-container">
				<FormHeader1
					formName="Simcards Form"
					fn={`Card No: ${simcard.cardNo}`}
					closeModal={closeModal}
				/>
				<Formik
					initialValues={simcard}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{formik => {
						const disabled = !(formik.isValid && formik.dirty);
						console.log(`formik.dirty`, formik.dirty);
						console.log(`formik.isValid`, formik.isValid);
						console.log(`disabled`, disabled);
						console.log(`formik`, formik);
						return (
							<Form>
								<div className="simcards-form">
									<div className="specific-data">
										{/* simcardPhoneNumber */}
										<FormikControl
											control="input"
											type="text"
											label="simcard number"
											name="simcardNumber"
											placeholder="Simcard Number"
										/>
										{/* simcardPhoneNumber */}
										<FormikControl
											control="input"
											type="text"
											label="phone number"
											name="simcardPhoneNumber"
											placeholder="Phone Number"
										/>
										{/* simcardType */}
										<FormikControl
											control="input"
											type="text"
											label="simcard type"
											name="simcardType"
											placeholder="Simcard Type"
										/>
										{/* NetworkOperator */}
										<FormikControl
											control="input"
											type="text"
											label="network operator"
											name="networkOperator"
											placeholder="Network Operator"
										/>
										{/* memory */}
										<FormikControl
											control="input"
											type="text"
											label="memory"
											name="memory"
											placeholder="memory"
										/>
									</div>
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

export default SimcardsForm;
